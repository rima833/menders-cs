"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  X,
  Clock,
  CheckCheck,
  User,
  Bot,
  Star,
  ThumbsUp,
  ThumbsDown,
  Minimize2,
  Maximize2
} from "lucide-react"

interface Message {
  id: string
  sender: "user" | "agent" | "bot"
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  attachments?: { name: string; url: string }[]
}

interface Agent {
  id: string
  name: string
  avatar: string
  status: "online" | "busy" | "away"
  specialization: string
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hello! I'm here to help you with your cleaning service needs. How can I assist you today?",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "read"
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agents: Agent[] = [
    {
      id: "1",
      name: "Kemi Adebayo",
      avatar: "/agent-1.jpg",
      status: "online",
      specialization: "Booking & Scheduling"
    },
    {
      id: "2", 
      name: "John Okafor",
      avatar: "/agent-2.jpg",
      status: "online",
      specialization: "Technical Support"
    },
    {
      id: "3",
      name: "Grace Onyema",
      avatar: "/agent-3.jpg", 
      status: "busy",
      specialization: "Customer Success"
    }
  ]

  const quickReplies = [
    "Book a cleaning service",
    "Check my booking status",
    "Pricing information",
    "Change my appointment",
    "Emergency cleaning",
    "Speak to an agent"
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      status: "sent"
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
    setShowQuickReplies(false)

    // Simulate agent typing and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      
      // Auto-assign agent if not already assigned
      if (!currentAgent) {
        const availableAgent = agents.find(agent => agent.status === "online")
        if (availableAgent) {
          setCurrentAgent(availableAgent)
        }
      }

      // Generate response based on message content
      let response = ""
      const lowerMessage = newMessage.toLowerCase()
      
      if (lowerMessage.includes("book") || lowerMessage.includes("appointment")) {
        response = "I'd be happy to help you book a cleaning service! Let me transfer you to our booking specialist. In the meantime, you can also use our quick booking system on the website."
      } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
        response = "Our pricing varies based on the type of service and size of your space. For a home cleaning service, prices start from ₦15,000. Would you like me to calculate a custom quote for you?"
      } else if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent")) {
        response = "I understand you need urgent cleaning service. Let me connect you with our emergency response team right away. They can typically arrange same-day service if available."
      } else {
        response = "Thank you for your message! I'm reviewing your request and will provide you with the best assistance. Is there anything specific you'd like to know about our cleaning services?"
      }

      const agentMessage: Message = {
        id: Date.now().toString(),
        sender: currentAgent ? "agent" : "bot",
        content: response,
        timestamp: new Date(),
        status: "read"
      }

      setMessages(prev => [...prev, agentMessage])
    }, 2000)
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
    setShowQuickReplies(false)
    setTimeout(() => sendMessage(), 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "busy": return "bg-yellow-500"
      case "away": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const ChatWidget = () => (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isOpen ? 'w-96 h-[600px]' : 'w-16 h-16'
    }`}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg relative"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </Button>
      ) : (
        <Card className="w-full h-full shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              {currentAgent ? (
                <>
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentAgent.avatar} />
                      <AvatarFallback>{currentAgent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(currentAgent.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{currentAgent.name}</p>
                    <p className="text-xs opacity-90">{currentAgent.specialization}</p>
                  </div>
                </>
              ) : (
                <>
                  <Bot className="w-8 h-8" />
                  <div>
                    <p className="font-medium text-sm">Menders Support</p>
                    <p className="text-xs opacity-90">Always here to help</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-1"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.sender === "user" && (
                              <div className="flex items-center space-x-1">
                                {message.status === "read" && (
                                  <CheckCheck className="w-3 h-3 text-blue-200" />
                                )}
                                {message.status === "delivered" && (
                                  <CheckCheck className="w-3 h-3 text-gray-300" />
                                )}
                                {message.status === "sent" && (
                                  <CheckCheck className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {showQuickReplies && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Quick replies:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(reply)}
                              className="text-xs justify-start"
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Typically replies in a few minutes</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Paperclip className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Smile className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  )

  return <ChatWidget />
}

// Full screen chat component for dedicated chat page
export function FullScreenChat() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const agents: Agent[] = [
    {
      id: "1",
      name: "Kemi Adebayo",
      avatar: "/agent-1.jpg",
      status: "online",
      specialization: "Booking & Scheduling"
    },
    {
      id: "2", 
      name: "John Okafor",
      avatar: "/agent-2.jpg",
      status: "online",
      specialization: "Technical Support"
    },
    {
      id: "3",
      name: "Grace Onyema",
      avatar: "/agent-3.jpg", 
      status: "busy",
      specialization: "Customer Success"
    }
  ]

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Support Chat</h2>
          <p className="text-sm text-gray-600">Connect with our team</p>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-3">Available Agents</h3>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAgent?.id === agent.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${
                      agent.status === "online" ? "bg-green-500" : 
                      agent.status === "busy" ? "bg-yellow-500" : "bg-gray-500"
                    } rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{agent.name}</p>
                    <p className="text-xs text-gray-600">{agent.specialization}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${
                        agent.status === "online" ? "text-green-600 border-green-200" :
                        agent.status === "busy" ? "text-yellow-600 border-yellow-200" :
                        "text-gray-600 border-gray-200"
                      }`}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedAgent ? (
          <>
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedAgent.avatar} />
                  <AvatarFallback>{selectedAgent.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedAgent.name}</p>
                  <p className="text-sm text-gray-600">{selectedAgent.specialization}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Start a conversation with {selectedAgent.name}
                </p>
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Select an agent to start chatting
              </h3>
              <p className="text-gray-500">
                Choose from our available support team members
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}