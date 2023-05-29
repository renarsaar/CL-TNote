export interface BasicSetupOptions {
  lineNumbers?: boolean;
  highlightActiveLineGutter?: boolean;
  highlightSpecialChars?: boolean;
  history?: boolean;
  foldGutter?: boolean;
  drawSelection?: boolean;
  dropCursor?: boolean;
  allowMultipleSelections?: boolean;
  indentOnInput?: boolean;
  syntaxHighlighting?: boolean;
  bracketMatching?: boolean;
  closeBrackets?: boolean;
  autocompletion?: boolean;
  rectangularSelection?: boolean;
  crosshairCursor?: boolean;
  highlightActiveLine?: boolean;
  highlightSelectionMatches?: boolean;
  closeBracketsKeymap?: boolean;
  defaultKeymap?: boolean;
  searchKeymap?: boolean;
  historyKeymap?: boolean;
  foldKeymap?: boolean;
  completionKeymap?: boolean;
  lintKeymap?: boolean;
}