import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../assets/js/privacy-language.js", import.meta.url), "utf8");

function redirect({ slug, section = "privacy", language, languages = [], query = "", hash = "", root, script = true }) {
  let destination;
  const base = `/policies/${slug}/${section}/`;
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

for (const [slug, section] of [["adeline", "privacy"], ["brayne", "privacy"], ["passingby", "privacy"], ["brayne", "terms"], ["passingby", "terms"], ["cubie", "privacy"], ["cubie", "terms"]]) {
  const base = `https://ywlee861009.github.io/policies/${slug}/${section}/`;
  test(`${slug}/${section}: Korean primary language opens Korean; all other primary languages open English`, () => {
    for (const [language, expected] of [["ko", "ko"], ["ko-KR", "ko"], ["KO-kr", "ko"], ["en-US", "en"], ["ja-JP", "en"], ["de", "en"], ["", "en"], [undefined, "en"]]) {
      assert.equal(redirect({ slug, section, language }), `${base}${expected}/`);
    }
    assert.match(redirect({ slug, section, language: "en-US", languages: ["en-US", "ko-KR"] }), /\/en\/$/);
    assert.match(redirect({ slug, section, language: undefined, languages: ["ko-KR"] }), /\/ko\/$/);
  });

  test(`${slug}/${section}: explicit app language wins and query/fragment survive`, () => {
    for (const [language, requested] of [["ko-KR", "en"], ["en-US", "ko"]]) {
      const query = `?lang=${requested}&source=app`;
      const hash = "#contact";
      assert.equal(redirect({ slug, section, language, query, hash }), `${base}${requested}/${query}${hash}`);
    }
    assert.match(redirect({ slug, section, language: "ja-JP", query: "?lang=fr" }), /\/en\/\?lang=fr$/);
  });

  test(`${slug}/${section}: automatic routing is confined to the gateway`, () => {
    const gateway = readFileSync(new URL(`../${slug}/${section}/index.md`, import.meta.url), "utf8");
    assert.ok(gateway.includes(`layout: ${section}-gateway`));
    assert.match(gateway, /auto_language: true/);
    assert.ok(gateway.includes(`policy_root: /${slug}/${section}/`));
    assert.ok(gateway.includes(`english_source: ${slug}/${section}/en/index.md`));
    for (const lang of ["ko", "en"]) {
      const page = readFileSync(new URL(`../${slug}/${section}/${lang}/index.md`, import.meta.url), "utf8");
      assert.ok(page.includes(`lang: ${lang}`));
      assert.ok(page.includes(`policy_root: /${slug}/${section}/`));
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
