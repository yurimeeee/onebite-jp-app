# Commit and Push (cpush)

현재 변경 사항을 분석하여 상세한 커밋 메시지를 작성하고, 원격 저장소에 푸시합니다.

## Usage

/cpush

## Instructions

1. 먼저 `git add .`을 실행하여 모든 변경 사항을 스테이징하세요.
2. `git diff --cached`를 통해 변경된 코드의 내용을 꼼꼼히 분석하세요.
3. 분석한 내용을 바탕으로 **Conventional Commits** 규격에 맞춰 상세한 커밋 메시지를 작성하세요.
   - **Type**: feat, fix, docs, style, refactor, test, chore 중 선택
   - **Subject**: 변경 사항의 핵심을 한 줄로 요약 (영문 권장)
   - **Body**: '왜(Why)'와 '무엇을(What)' 변경했는지 구체적인 항목별로 설명
4. 작성된 메시지로 `git commit -m "[메시지]"`를 실행하세요.
5. 마지막으로 `git push`를 실행하여 서버에 반영하세요.
1