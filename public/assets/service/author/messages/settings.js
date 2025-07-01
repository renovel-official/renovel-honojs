const members = document.querySelectorAll(".member");

await (async () => {
    for (let member of members) {
        const memberId = member.id;
        const selectRoleElement = document.querySelector(`#role-${memberId}`);
        const deleteMemberElement = document.querySelector(`#delete-${member}`);

        selectRoleElement.addEventListener("change", async (e) => {
            const roleId = e.target.value;
            const response = await fetch(`/api/v4/messages/member/${memberId}`, {
                method: "PUT",
                body: JSON.stringify({ roleId }),
            });
        });
    }
})();
