export function isCurrentFocusOnTypingInput() {
  const isTypingInput =
    (document.activeElement instanceof HTMLInputElement &&
      document.activeElement.type !== 'checkbox') ||
    document.activeElement instanceof HTMLTextAreaElement;

  return document.hasFocus() && isTypingInput;
}
