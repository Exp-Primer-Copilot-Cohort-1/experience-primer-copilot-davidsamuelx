function skillsMember() {
  var mySkills = ["HTML", "CSS", "JS", "PHP", "MySQL"];
  var member = {
    name: "John",
    age: 25,
    skills: mySkills,
    showSkills: function() {
      var result = "";
      for (var i = 0; i < this.skills.length; i++) {
        result += this.skills[i] + " ";
      }
      return result;
    }
  };
  return member;
}