class MailIcon {

  get behaviors () {
    return []
  }

  beforeRegister () {
    this.is = `mail-icon`
    this.properties = {}
  }
}

Polymer(MailIcon)
