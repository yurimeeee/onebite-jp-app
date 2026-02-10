# Vercel Production Deploy & Monitor (/vdeploy)

현재 프로젝트를 Vercel 프로덕션 환경에 배포하고, 빌드 로그를 분석하여 성능 최적화 리포트를 제공합니다.

## Usage

/vdeploy

## Instructions

### 1. Execute Deployment

1. `vercel --prod` 명령어를 실행하여 배포를 시작하세요.
2. 실행 중 터미널에 출력되는 **Build Logs**를 실시간으로 캡처하고 분석하세요.

### 2. Deep Log Analysis

3. 빌드 과정에서 발생한 모든 **Warning**과 **Error**를 식별하세요.
4. 특히 다음 두 가지 사항을 중점적으로 체크하세요:
   - **Chunk Size Warning**: `build.chunkSizeWarningLimit` 초과 여부
   - **Manual Chunks Suggestion**: `manualChunks` 설정 권장 여부
5. 만약 위 경고가 떴다면, 어떤 외부 라이브러리(Node Modules)가 범인인지 파악하고, `vite.config.ts`에 적용할 수 있는 최적화 코드 스니펫을 준비하세요.

### 3. Final Deployment Report

6. 배포가 완료되면 다음 정보를 포함하여 보고하세요:
   - **Production URL**: 배포된 최종 주소
   - **Build Status**: ✅ 성공 또는 ⚠️ 경고 발생 (내용 요약)
   - **Optimization Guide**: (경고가 있을 경우에만) 구체적인 `manualChunks` 설정 제안 및 성능 개선 팁
