function constructMember(memberdata) {
  const MemberObject = {
    name: memberdata.firstName,
    _active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    get age() {
      return new Date().getFullYear() - this.birthday.getFullYear();
    },
    get ageGroup() {
      return this.age < 18 ? "Junior" : "Senior";
    },
    get active() {
      return this._active ? "Aktiv" : "Inaktiv";
    },
  };

  return MemberObject;
}

export { constructMember };
