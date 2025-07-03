"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatItem {
  id: string
  name: string
  lastMessage: string
  unreadCount: number
  avatarUrl?: string
  isActive?: boolean
}

interface ChatListProps {
  chats: ChatItem[]
  onSelectChat: (chatId: string) => void
  activeChat?: string
}

export function ChatList({ chats, onSelectChat, activeChat }: ChatListProps) {
  return (
    <div className="space-y-1 py-2">
      {chats.map((chat) => (
        <button
          key={chat.id}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left",
            activeChat === chat.id ? "bg-primary/10" : "hover:bg-muted transition-colors",
          )}
          onClick={() => onSelectChat(chat.id)}
        >
          <Avatar className="h-10 w-10 flex-shrink-0">
            {chat.avatarUrl && <AvatarImage src={chat.avatarUrl} alt={chat.name} />}
            <AvatarFallback>{chat.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="font-medium truncate">{chat.name}</span>
              {chat.unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-2">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

