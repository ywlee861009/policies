import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../assets/js/privacy-language.js", import.meta.url), "utf8");

function redirect({ slug, language, languages = [], query = "", hash = "", root, script = true }) {
  let destination;
  const base = `/policies/${slug}/privacy/`;
  vm.runInNewContext(source, {
    URL,
    navigator: { language, languages },
    document: {
      querySelector: () => script ? { getAttribute: () => root ?? base } : null,
    },
    window: {
      location: {
        href: `https://ywlee861009.github.io${base}${query}${hash}`,
        replace: (url) => { destination = url; },
      },
    },
  });
  return destination;
}

for (const slug of ["adeline", "brayne", "passingby"]) {
  test(`${slug}: Korean primary language opens Korean; all other primary languages open English`, () => {
    for (const [language, expected] of [["ko", "ko"], ["ko-KR", "ko"], ["KO-kr", "ko"], ["en-US", "en"], ["ja-JP", "en"], ["de", "en"], ["", "en"], [undefined, "en"]]) {
      assert.equal(redirect({ slug, language }), `https://ywlee861009.github.io/policies/${slug}/privacy/${expected}/`);
    }
    assert.match(redirect({ slug, language: "en-US", languages: ["en-US", "ko-KR"] }), /\/en\/$/);
    assert.match(redirect({ slug, language: undefined, languages: ["ko-KR"] }), /\/ko\/$/);
  });

  test(`${slug}: explicit app language wins and query/fragment survive`, () => {
    for (const [language, requested] of [["ko-KR", "en"], ["en-US", "ko"]]) {
      const query = `?lang=${requested}&source=app`;
      const hash = "#contact";
      assert.equal(redirect({ slug, language, query, hash }), `https://ywlee861009.github.io/policies/${slug}/privacy/${requested}/${query}${hash}`);
    }
    assert.match(redirect({ slug, language: "ja-JP", query: "?lang=fr" }), /\/en\/\?lang=fr$/);
  });

  test(`${slug}: automatic routing is confined to the gateway`, () => {
    const gateway = readFileSync(new URL(`../${slug}/privacy/index.md`, import.meta.url), "utf8");
    assert.match(gateway, /layout: privacy-gateway/);
    assert.match(gateway, /auto_language: true/);
    assert.ok(gateway.includes(`english_source: ${slug}/privacy/en/index.md`));
    for (const lang of ["ko", "en"]) {
      const page = readFileSync(new URL(`../${slug}/privacy/${lang}/index.md`, import.meta.url), "utf8");
      assert.ok(page.includes(`lang: ${lang}`));
      assert.match(page, /layout: privacy\n/);
      assert.doesNotMatch(page, /auto_language: true/);
      assert.match(page, /\n# /);
    }
  });
}

test("missing routing metadata leaves the readable fallback untouched", () => {
  assert.equal(redirect({ slug: "adeline", language: "ko", script: false }), undefined);
  assert.equal(redirect({ slug: "adeline", language: "ko", root: "" }), undefined);
});
