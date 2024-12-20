
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationCity";
import CheckCircleIcon from "@mui/icons-material/Check";
import LanguageIcon from '@mui/icons-material/Language';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BusinessIcon from '@mui/icons-material/Business';

const design = "absolute top-2 border-r border-black peer-focus:text-violet-700 mx-2"

 const companyRegisterInputArr = [
        {
          type: "text",
          id: "companyName",
          name: "companyName",
          required: true,
          placeholder: "Enter Company Name",
          icon: <PersonIcon className={design} />
        },
        {
          type: "tel",
          id: "phone",
          name: "phone",
          required: true,
          placeholder: "Enter Company Phone Number",
          icon: <PhoneIcon className={design} />
        },
        {
          type: "email",
          id: "email",
          name: "email",
          required: true,
          placeholder: "Enter Company Email",
          icon: <EmailIcon className={design} />
        },
        {
          type: "textarea",
          id: "location",
          name: "location",
          required: true,
          placeholder: "Enter Company Address",
          icon: <LocationOnIcon className={design} />
        },
        {
          type: "date",
          id: "founded_date",
          name: "founded_date",
          required: true,
          placeholder: "Enter Company Founded Date",
          icon: <EventNoteIcon className={design}/>
        },
        {
          type: "url",
          id: "website",
          name: "website",
          required: true,
          placeholder: "Enter Company Website Link",
          icon: <LanguageIcon className={design}/>
        },
        {
          type: "text",
          id: "industry",
          name: "industry",
          required: true,
          placeholder: "Select Industry",
          icon: <BusinessIcon className={design}/>
        },
        {
            type: "password",
            id: "password",
            name: "password",
            required: true,
            placeholder: "Enter Password",
            icon: <LockIcon className={design} />
          },
          {
            type: "password",
            id: "password2",
            name: "password2",
            required: true,
            placeholder: "Confirm Password",
            icon: <LockIcon className={design} />
          },
      ];

      export default companyRegisterInputArr;