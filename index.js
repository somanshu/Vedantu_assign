
// classes - A,B
// Food - V, NV
// 4 houses equal capacity

class House {
  constructor(classType, foodType, capacity) {
    this.classType = classType
    this.foodType = foodType
    this.students = []
    this.capacity = capacity
  }

  insert(student) {
    if (!this.canInsert()) return false
    this.students.push(student)
    return true
  }

  canInsert() {
    return this.students.length < this.capacity
  }

  getStudents() {
    return this.students;
  }
}

class Student {
  constructor(rollNo, classAssigned, foodPref) {
    this.rollNo = rollNo
    this.foodPref = foodPref
    this.classAssigned = classAssigned
  }
}

class SortingHat {
  constructor(capacity) {
    this.totalCapacity = capacity
    this.perHouseCapacity = Math.floor(capacity / 4)
    this.houses = {}
    this.na = []
    this.houseIdxMap = {}
  }

  getHouse(student) {
    const occupiedHouses = Object.keys(this.houses).length
    const { rollNo, foodPref, classAssigned } = student;
    let key = `${classAssigned}${foodPref}`
    if (!this.houses[key]) {
      if (occupiedHouses === 4) return null;
      this.houses[key] = new House(classAssigned, foodPref, this.perHouseCapacity)
      this.houseIdxMap[key] = 1
      return this.houses[key]
    }

    if (this.houses[key].canInsert()) {
      return this.houses[key]
    }

    let idx = this.houseIdxMap[key]

    if (idx - 1 > 0) {
      let newKey = key + `-${idx - 1}`

      if (this.houses[newKey] && this.houses[newKey].canInsert()) {
        return this.houses[newKey]
      }
    }

    if (occupiedHouses === 4) return null;

    const newKey = key + `-${this.houseIdxMap[key]}`
    this.houseIdxMap[key] += 1
    this.houses[newKey] = new House(classAssigned, foodPref, this.perHouseCapacity)
    return this.houses[newKey]
  }

  insertStudent(student) {
    const house = this.getHouse(student)

    if (!house) {
      this.na.push(student.rollNo)
      return
    }

    house.insert(student.rollNo)
  }

  getResult() {
    Object.keys(this.houses).forEach((k) => {
      const students = this.houses[k].getStudents()
      console.log(`${k} : `, students)
    })
    console.log(`NA : `, this.na)
  }
}

function testing1() {
  shat = new SortingHat(12)
  shat.insertStudent(new Student(1, 'B', 'V'))
  shat.insertStudent(new Student(2, 'A', 'V'))
  shat.insertStudent(new Student(3, 'A', 'V'))
  shat.insertStudent(new Student(4, 'B', 'NV'))
  shat.insertStudent(new Student(5, 'B', 'V'))
  shat.insertStudent(new Student(6, 'A', 'NV'))
  shat.insertStudent(new Student(7, 'A', 'V'))
  shat.insertStudent(new Student(8, 'A', 'NV'))
  shat.insertStudent(new Student(9, 'B', 'NV'))
  shat.insertStudent(new Student(10, 'B', 'V'))
  shat.insertStudent(new Student(11, 'A', 'NV'))
  shat.insertStudent(new Student(12, 'B', 'NV'))
  shat.insertStudent(new Student(13, 'A', 'NV'))
  shat.getResult()
}

function testing2() {
  shat = new SortingHat(12)
  shat.insertStudent(new Student(1, 'B', 'V'))
  shat.insertStudent(new Student(2, 'A', 'V'))
  shat.insertStudent(new Student(3, 'A', 'V'))
  shat.insertStudent(new Student(4, 'B', 'V'))
  shat.insertStudent(new Student(5, 'B', 'V'))
  shat.insertStudent(new Student(6, 'A', 'V'))
  shat.insertStudent(new Student(7, 'A', 'V'))
  shat.insertStudent(new Student(8, 'A', 'V'))
  shat.insertStudent(new Student(9, 'B', 'V'))
  shat.insertStudent(new Student(10, 'B', 'V'))
  shat.insertStudent(new Student(11, 'A', 'V'))
  shat.insertStudent(new Student(12, 'B', 'V'))
  shat.insertStudent(new Student(13, 'A', 'V'))
  shat.getResult()
}

function testing3() {
  shat = new SortingHat(12)
  shat.insertStudent(new Student(1, 'A', 'V'))
  shat.insertStudent(new Student(2, 'A', 'V'))
  shat.insertStudent(new Student(3, 'A', 'V'))
  shat.insertStudent(new Student(4, 'A', 'V'))
  shat.insertStudent(new Student(5, 'A', 'V'))
  shat.insertStudent(new Student(6, 'A', 'V'))
  shat.insertStudent(new Student(7, 'A', 'V'))
  shat.insertStudent(new Student(8, 'A', 'V'))
  shat.insertStudent(new Student(9, 'A', 'V'))
  shat.insertStudent(new Student(10, 'A', 'V'))
  shat.insertStudent(new Student(11, 'A', 'V'))
  shat.insertStudent(new Student(12, 'A', 'V'))
  shat.insertStudent(new Student(13, 'A', 'V'))
  shat.getResult()
}

testing1()
testing2()
testing3()