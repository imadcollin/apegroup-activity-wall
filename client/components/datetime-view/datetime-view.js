class DateTimeView {

  get behaviors () {
    return []
  }

  beforeRegister () {
    this.is = `datetime-view`
    this.properties = {
      currentDate: String
    }
  }

  created () {
    console.info(`Component created`)
  }

  attached () {
    console.info(`Component attached`);

    window.setInterval((function() {
      this.currentDate = this._getCurrentDate()
    }).bind(this), 1000)
  }

  detached () {
    console.info(`Component detached`)
  }

  _getCurrentDate () {
    return dateFormat(' %H:%i', new Date())
  }

}

Polymer(DateTimeView)
