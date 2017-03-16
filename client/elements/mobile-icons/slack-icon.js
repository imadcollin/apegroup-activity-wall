class SlackIcon {

  get behaviors () {
    return []
  }

  beforeRegister () {
    this.is = `slack-icon`
    this.properties = {}
  }
}

Polymer(SlackIcon)