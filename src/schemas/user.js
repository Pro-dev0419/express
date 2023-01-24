const saveUser = {
	type: "object",
	required: ["email", "name"],
	properties: {
	  email: {
		type: "string",
		format: "email",
		errorMessage: {
		  format: "Field 'email' incorrect",
		  type: "Field 'email' should be a string",
		},
	  },
	  name: {
		type: "string",
		minLength: 2,
		maxLength: 30,
		pattern: "^[a-zA-Z0-9_ ]*$",
		errorMessage: {
		  pattern: "Field 'name' can contain only letters and spaces",
		  type: "Field 'name' should be a string",
		},
	  },
  
	},
  };
  
  export default {
	saveUser,
  };
  