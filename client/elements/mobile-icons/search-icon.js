class SearchIcon {

  get behaviors () {
    return []
  }

  beforeRegister () {
    this.is = `search-icon`
    this.properties = {}
  }
}

Polymer(SearchIcon)