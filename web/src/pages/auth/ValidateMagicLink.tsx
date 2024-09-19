import { Auth } from "@services/api/auth";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ValidateMagicLink: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const validate = async () => {
      const token = params.get("token");

      try {
        if (token) {
          await Auth.validateMagicLink(token);
          navigate("/letters");
        }
      } catch {
        navigate("/login?reason=invalid_magic_link");
      }
    };

    validate();
  }, [params, navigate]);

  return <h1>validating magic link</h1>;
};

export default ValidateMagicLink;
