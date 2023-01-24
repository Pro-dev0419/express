const saveJob = {
  type: "object",
  required: ["company_email", "company_name"],
  properties: {
    company_email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Field 'email' incorrect",
        type: "Field 'email' should be a string",
      },
    },
    company_name: {
      type: "string",
      minLength: 2,
      maxLength: 130,
      pattern: "^[a-zA-Z0-9_ ]*$",
      errorMessage: {
        pattern: "Field 'name' can contain only letters and spaces",
        type: "Field 'name' should be a string",
      },
    },

  },
};

export default {
  saveJob,
};
