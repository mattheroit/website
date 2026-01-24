# mattheroit.com

Zdrojový repozitář pro [web][link]

> [!CAUTION]
> pridavana slozka se musi jmenovat `docs` a musi byt ulozena v rootu repozitare.
> Musi obsahovat slozky `cs` a `en`, ve kterych bude obsah pro stranku, slozka `public` je urcena pro assety (fotky, videa atd.) (optional)

**Jak přidat projekt**: _(Protože to určitě zapomenu)_

```sh
# Pridame jako submodul
git submodule add --name <jmeno repozitare> <odkaz na repozitar> src/projects/<jmeno repozitare>

# Zapneme sparse
git config submodule.src/projects/<jmeno repozitare>.sparseCheckout true

# Pridame pouze /docs slozku
git sparse-checkout set docs

# Ted by mela byt videt pouze slozka /docs a soubory v rootu repozitare
```

[link]: https://mattheroit.com/
