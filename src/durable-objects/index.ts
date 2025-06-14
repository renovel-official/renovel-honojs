import { DurableObjectState } from "@cloudflare/workers-types";

interface Payload {
    message: string;
    sender: any;
    
}

export class ChatRoom {
  state: DurableObjectState;
  sessions: Map<string, WritableStreamDefaultWriter>;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.sessions = new Map();
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const roomId = url.pathname.split('/').pop();
    const { searchParams } = url;
    const clientId = searchParams.get('clientId') || crypto.randomUUID();

    if (request.method === 'POST') {
      const { message, sender } = (await request.json()) as Payload;
      this.broadcast({ message, sender });
      return new Response('OK');
    }

    if (request.method === 'GET') {
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      this.sessions.set(clientId, writer);

      const keepAlive = setInterval(() => {
        writer.write(`:\n\n`);
      }, 15000);

      request.signal?.addEventListener('abort', () => {
        writer.close();
        clearInterval(keepAlive);
        this.sessions.delete(clientId);
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  }

  broadcast(data: { message: string; sender: string }) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const [id, writer] of this.sessions) {
      writer.write(payload).catch(() => {
        this.sessions.delete(id);
      });
    }
  }
}