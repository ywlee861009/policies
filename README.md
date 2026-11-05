# policies

케로스튜디오 앱·게임의 개인정보 처리방침과 이용약관을 GitHub Pages로 공개하는 저장소다.
공개 주소: https://ywlee861009.github.io/policies/

## 구조

```
<slug>/privacy/index.md      언어 자동 선택 진입점 (기존 주소, Play Console에 등록)
<slug>/privacy/ko/index.md   한국어판 (기준 문서)
<slug>/privacy/en/index.md   영문판 (번역 + 지역별 이용자 추가 조항)
<slug>/terms/index.md        이용약관 언어 자동 선택 진입점 (게시한 앱만)
<slug>/terms/ko/index.md     한국어 이용약관 (기준 문서)
<slug>/terms/en/index.md     영문 이용약관
index.md                     앱 목록
```

| 앱 | slug | 처리방침 주소 (언어 자동 선택) |
|---|---|---|
| 트리니티: 영웅 원정대 (`com.kero.brayne`) | `brayne` | https://ywlee861009.github.io/policies/brayne/privacy/ (영문 `en/`) |
| 아델린의 작은 식탁 (Adeline’s Little Table) | `adeline` | https://ywlee861009.github.io/policies/adeline/privacy/ (영문 `en/`) |
| Passing By (`com.kero.passingby`) | `passingby` | https://ywlee861009.github.io/policies/passingby/privacy/ (영문 `en/`) |

BRAYNE (트리니티: 영웅 원정대)의 Play Console 서비스 약관 URL은
https://ywlee861009.github.io/policies/brayne/terms/ 이다.
고정 한국어판은 `brayne/terms/ko/`, 영문판은 `brayne/terms/en/`이며 개인정보 처리방침과 별도 문서다.

Passing By의 Play Console 서비스 약관 URL은
https://ywlee861009.github.io/policies/passingby/terms/ 이다.
고정 한국어판은 `passingby/terms/ko/`, 영문판은 `passingby/terms/en/`이다.
코스별 일회성 구매·복원·환불, 타이머·알림, 로컬 여행 기록·기기 백업에 관한 앱 전용 약관이다.

## 언어 선택

- Play Console에는 기존 `<slug>/privacy/` 주소 하나를 계속 등록한다.
- 진입점의 JavaScript가 브라우저의 **우선 언어**를 확인한다. `ko` 또는 `ko-*`이면 `ko/`, 그 외에는 `en/`으로 이동한다. 언어를 확인할 수 없을 때도 영어를 사용한다.
- 앱 안에서는 앱에서 선택한 언어의 `ko/` 또는 `en/` 주소를 직접 연다. 진입점에 `?lang=ko` 또는 `?lang=en`을 붙여도 브라우저 언어보다 우선한다.
- `ko/`와 `en/`에서는 자동 이동하지 않는다. 상단의 **한국어 / English** 링크로 직접 선택한 언어를 유지한다.
- JavaScript가 꺼져 있거나 로드되지 않아도 진입점에서 영어 전문과 두 언어 링크를 읽을 수 있다. 영어 본문은 `en/index.md`에서 렌더링하므로 중복으로 수정하지 않는다.
- 언어 선택에는 쿠키, 로컬 저장소, 외부 스크립트 또는 추가 네트워크 서비스를 사용하지 않는다. 기존 URL의 쿼리와 섹션 주소(`#…`)는 이동 시 유지한다.
- 이용약관의 `terms/` 진입점도 같은 언어 선택 스크립트와 본문 레이아웃을 사용한다. `terms-gateway`는 JavaScript 없이도 영문 약관 전문을 표시하며, 언어별 약관에서는 자동 이동하지 않는다.

언어 이동 회귀 검사는 `node --test scripts/privacy-language.test.mjs`로 실행한다.

## 규칙

1. **주소는 바꾸지 않는다.** 앱과 Play Console이 이 주소를 가리킨다. 저장소 이름과 폴더 이름을 바꾸면
   모든 앱의 링크가 깨진다.
2. **slug는 앱 ID(패키지명)의 마지막 단어로 짓는다.** 앱 제목은 바뀌지만 앱 ID는 스토어 게시 후 바꿀 수 없다.
3. **SDK를 넣거나 빼면 같은 날 함께 고친다.** 그 앱의 한국어·영문 처리방침, Play Console 데이터 보안 양식,
   처리방침의 공고일·시행일과 변경 이력. 한국어판만 고치고 영문판을 빠뜨리지 않는다.
4. **새 앱을 내면** 기존 앱 폴더를 복사해 그 앱이 쓰는 SDK 기준으로 고치고, `index.md` 목록과 이 README 표에
   한 줄을 추가한다.
5. 이 저장소는 공개 저장소다. 공개 정책·약관과 그 게시에 필요한 파일 외의 메모·초안·내부 자료는 넣지 않는다.
6. 이용약관을 변경하면 같은 날 한국어·영문, 공고일·시행일과 변경 이력을 함께 갱신한다. 앱의 실제 기능 및 소비자의 강행적 권리와 모순되는 내용을 넣지 않는다.
