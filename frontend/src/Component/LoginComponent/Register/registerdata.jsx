
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";


const design = "absolute top-2 border-r border-black peer-focus:text-violet-700"

 const registerInputArr = [
        {
          type: "text",
          id: "name",
          name: "name",
          required: true,
          placeholder: "Enter Name",
          icon: <PersonIcon className={design} />
        },
        {
          type: "email",
          id: "email",
          name: "email",
          required: true,
          placeholder: "Enter Your Email",
          icon: <EmailIcon className={design} />
        },
        {
          type: "password",
          id: "password",
          name: "password",
          required: true,
          placeholder: "Enter Your Password",
          icon: <LockIcon className={design} />
        },
        {
          type: "password",
          id: "password2",
          name: "password2",
          required: true,
          placeholder: "Confirm Password",
          icon: <LockIcon className={design} />
        }
      ];

      export default registerInputArr;