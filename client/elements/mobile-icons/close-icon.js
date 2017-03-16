class CloseIcon {

  get behaviors () {
    return []
  }

  beforeRegister () {
    this.is = `close-icon`
    this.properties = {}
  }
}

Polymer(CloseIcon)
