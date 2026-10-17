# policies

케로스튜디오 앱·게임의 개인정보 처리방침을 GitHub Pages로 공개하는 저장소다.
공개 주소: https://ywlee861009.github.io/policies/

## 구조

```
<slug>/privacy/index.md      앱 하나의 개인정보 처리방침 (한국어, 기준 문서, Play Console에 등록)
<slug>/privacy/en/index.md   영문판 (번역 + 지역별 이용자 추가 조항)
<slug>/terms/index.md        (필요해지면) 같은 앱의 이용약관
index.md                     앱 목록
```

| 앱 | slug | 처리방침 주소 |
|---|---|---|
| 트리니티: 영웅 원정대 (`com.kero.brayne`) | `brayne` | https://ywlee861009.github.io/policies/brayne/privacy/ (영문 `en/`) |
| 아델린의 작은 식탁 (Adeline’s Little Table) | `adeline` | https://ywlee861009.github.io/policies/adeline/privacy/ (영문 `en/`) |
| Passing By (`com.kero.passingby`) | `passingby` | https://ywlee861009.github.io/policies/passingby/privacy/ (영문 `en/`) |

## 규칙

1. **주소는 바꾸지 않는다.** 앱과 Play Console이 이 주소를 가리킨다. 저장소 이름과 폴더 이름을 바꾸면
   모든 앱의 링크가 깨진다.
2. **slug는 앱 ID(패키지명)의 마지막 단어로 짓는다.** 앱 제목은 바뀌지만 앱 ID는 스토어 게시 후 바꿀 수 없다.
3. **SDK를 넣거나 빼면 같은 날 함께 고친다.** 그 앱의 한국어·영문 처리방침, Play Console 데이터 보안 양식,
   처리방침의 공고일·시행일과 변경 이력. 한국어판만 고치고 영문판을 빠뜨리지 않는다.
4. **새 앱을 내면** 기존 앱 폴더를 복사해 그 앱이 쓰는 SDK 기준으로 고치고, `index.md` 목록과 이 README 표에
   한 줄을 추가한다.
5. 이 저장소는 공개 저장소다. 처리방침 외의 메모·초안·내부 자료는 넣지 않는다.
