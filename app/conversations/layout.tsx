import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebars/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function conversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />{children}</div>
    </Sidebar>

  );
}
