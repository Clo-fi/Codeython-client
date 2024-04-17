module.exports = {
  types: [
    { value: "✨ feat", name: "✨ feat: 새로운 기능 추가" },
    { value: "🐛 fix", name: "🐛 fix: 버그 수정" },
    { value: "📝 docs", name: "📝 docs: 문서 수정" },
    {
      value: "♻️ refactor",
      name: "♻️ refactor: 리팩토링, 기타 수정",
    },
    { value: "✏️ rename", name: "✏️ rename: 파일 혹은 폴더명 수정" },
    {
      value: "❌ remove",
      name: "❌ remove: 파일, 폴더 삭제",
    },
  ],
  messages: {
    type: "커밋 유형을 선택해주세요.\n",
    subject: "커밋 메세지를 간결하게 작성해주세요.\n",
    confirmCommit: "커밋메시지를 제대로 입력하셨나요? (y or n)",
  },
  skipQuestions: ["body", "footer"],
  subjectLimit: 60,
  skipEmptyScopes: true,
};
