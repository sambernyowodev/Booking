const userRoleDTO = require("./userRoleDto");
class UserDTO {
  constructor(id, userName, email, firstName, lastName, userRole) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userRole = new userRoleDTO(
      userRole.id,
      userRole.name,
      userRole.description
    );
  }
}

module.exports = UserDTO;
