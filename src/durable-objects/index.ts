// chatRoom.ts
import type { DurableObjectState, WebSocketPair } from "@cloudflare/workers-types";

// WebSocket 接続の管理用 Durable Object
export class ChatRoom {
  state: DurableObjectState;
  env: any;
  connections: Map<WebSocket, string>;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
    this.connections = new Map();
  }

  async fetch(request: Request): Promise<Response> {
    const upgradeHeader = request.headers.get("Upgrade");

    if (upgradeHeader !== "websocket") {
      return new Response("Expected websocket", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    server.accept();

    this.connections.set(server, ""); // 名前等が必要なら調整

    server.addEventListener("message", (event) => {
      const message = event.data;

      // すべてのクライアントにブロードキャスト
      for (const [conn] of this.connections) {
        if (conn.readyState === WebSocket.OPEN) {
          conn.send(message);
        }
      }
    });

    server.addEventListener("close", () => {
      this.connections.delete(server);
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    } as unknown as ResponseInit); // TypeScript workaround
  }
}