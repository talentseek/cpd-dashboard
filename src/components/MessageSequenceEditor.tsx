"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, ChevronDown, ChevronUp, Clock, Plus, Save, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSequence } from "@/types/messageSequence";

interface MessageSequenceEditorProps {
  type: "openProfile" | "connectionRequest";
  initialSequence?: MessageSequence;
  campaignId: string;
  onSave?: (newSequence: MessageSequence) => Promise<void>;
}

export function MessageSequenceEditor({ type, initialSequence, campaignId, onSave }: MessageSequenceEditorProps) {
  const [sequence, setSequence] = useState<MessageSequence>(() => {
    // Clean initial sequence to ensure Stage 1 has no delay_days
    const cleanedMessages = (initialSequence?.messages || []).map((message) => {
      if (message.stage === 1) {
        const { delay_days, ...rest } = message;
        return rest;
      }
      return message;
    });

    return {
      messages: cleanedMessages.length > 0 ? cleanedMessages : (type === "openProfile" ? [{ stage: 1, content: "", subject: "" }] : [{ stage: 1, content: "" }]),
      ...(type === "connectionRequest" ? { connection_request_message: initialSequence?.connection_request_message || { content: "" } } : {}),
    };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddMessage = () => {
    const newStage = sequence.messages.length + 1;

    const newMessage =
      type === "openProfile"
        ? { 
            stage: newStage, 
            content: "", 
            subject: "", 
            ...(newStage > 1 ? { delay_days: 3 } : {})
          }
        : { 
            stage: newStage, 
            content: "", 
            ...(newStage > 1 ? { delay_days: 3 } : {})
          };

    // delay_days is now properly typed in the object creation

    setSequence({
      ...sequence,
      messages: [...sequence.messages, newMessage],
    });
  };

  const handleRemoveMessage = (index: number) => {
    const newMessages = [...sequence.messages];
    newMessages.splice(index, 1);

    const reorderedMessages = newMessages.map((msg, idx) => ({
      ...msg,
      stage: idx + 1,
    }));

    setSequence({
      ...sequence,
      messages: reorderedMessages,
    });
  };

  const handleMoveMessage = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sequence.messages.length - 1)) {
      return;
    }

    const newMessages = [...sequence.messages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    [newMessages[index], newMessages[targetIndex]] = [newMessages[targetIndex], newMessages[index]];

    const reorderedMessages = newMessages.map((msg, idx) => ({
      ...msg,
      stage: idx + 1,
      // Ensure Stage 1 has no delay_days after reordering
      ...(idx === 0 ? { delay_days: undefined } : msg.delay_days ? { delay_days: msg.delay_days } : {}),
    }));

    setSequence({
      ...sequence,
      messages: reorderedMessages,
    });
  };

  const handleUpdateMessage = (index: number, field: string, value: string | number) => {
    const newMessages = [...sequence.messages];
    newMessages[index] = {
      ...newMessages[index],
      [field]: value,
    };

    // If updating delay_days for Stage 1, remove it
    if (newMessages[index].stage === 1 && field === "delay_days") {
      delete newMessages[index].delay_days;
    }

    setSequence({
      ...sequence,
      messages: newMessages,
    });
  };

  const handleUpdateConnectionRequest = (content: string) => {
    if (type === "connectionRequest" && sequence.connection_request_message) {
      setSequence({
        ...sequence,
        connection_request_message: {
          ...sequence.connection_request_message,
          content,
        },
      });
    }
  };

  const validateSequence = (): string | null => {
    for (const [index, message] of sequence.messages.entries()) {
      if (!message.content.trim()) {
        return `Message content for Stage ${message.stage} cannot be empty.`;
      }
      if (type === "openProfile" && (!message.subject || !message.subject.trim())) {
        return `Subject for Stage ${message.stage} cannot be empty.`;
      }
      if (message.stage === 1 && message.delay_days !== undefined) {
        return `Stage 1 should not have a delay.`;
      }
    }

    if (type === "connectionRequest" && sequence.connection_request_message?.content.trim() === "") {
      return "Connection request message cannot be empty.";
    }

    return null;
  };

  const handleSave = async () => {
    if (!onSave) return;

    // Validate the sequence before saving
    const validationError = validateSequence();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);
    setError(null);

    // Clean the sequence to ensure Stage 1 has no delay_days
    const cleanedMessages = sequence.messages.map((message) => {
      if (message.stage === 1) {
        const { delay_days, ...rest } = message;
        return rest;
      }
      return message;
    });

    const cleanedSequence: MessageSequence = {
      ...sequence,
      messages: cleanedMessages,
    };

    try {
      await onSave(cleanedSequence);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string'
          ? err.message
          : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <Alert className="bg-green-50 text-green-700 border-green-200">
          <Check className="h-4 w-4" />
          <AlertDescription>Message sequence saved successfully!</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {type === "connectionRequest" && sequence.connection_request_message && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Connection Request Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="connection-request">Message</Label>
                <Textarea
                  id="connection-request"
                  value={sequence.connection_request_message.content}
                  onChange={(e) => handleUpdateConnectionRequest(e.target.value)}
                  placeholder="Enter your connection request message..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  Available variables: {"{first_name}"}, {"{company}"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Message Sequence</CardTitle>
          <Button variant="outline" size="sm" onClick={handleAddMessage} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Message
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-4">
            {sequence.messages.map((message, index) => (
              <AccordionItem key={index} value={`message-${index}`} className="border rounded-md px-4">
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Stage {message.stage}</span>
                      {message.stage > 1 && message.delay_days && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>+{message.delay_days} days</span>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveMessage(index, "up");
                      }}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveMessage(index, "down");
                      }}
                      disabled={index === sequence.messages.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMessage(index);
                      }}
                      className="text-destructive hover:text-destructive"
                      disabled={sequence.messages.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <AccordionContent className="space-y-4 pt-2 pb-4">
                  {type === "openProfile" && (
                    <div className="space-y-2">
                      <Label htmlFor={`subject-${index}`}>Subject</Label>
                      <Input
                        id={`subject-${index}`}
                        value={message.subject || ""}
                        onChange={(e) => handleUpdateMessage(index, "subject", e.target.value)}
                        placeholder="Enter message subject..."
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor={`content-${index}`}>Message Content</Label>
                    <Textarea
                      id={`content-${index}`}
                      value={message.content}
                      onChange={(e) => handleUpdateMessage(index, "content", e.target.value)}
                      placeholder="Enter your message content..."
                      className="min-h-[150px]"
                    />
                  </div>

                  {index > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor={`delay-${index}`}>Delay (days)</Label>
                      <Input
                        id={`delay-${index}`}
                        type="number"
                        min={1}
                        value={message.delay_days || 3}
                        onChange={(e) => handleUpdateMessage(index, "delay_days", Number.parseInt(e.target.value))}
                      />
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>
                      Available variables: {"{first_name}"}, {"{company}"}, {"{landingpage}"}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {sequence.messages.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <p>No messages in sequence. Add your first message to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <AlertCircle className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Sequence
            </>
          )}
        </Button>
      </div>
    </div>
  );
}