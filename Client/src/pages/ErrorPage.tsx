import { Button, Container } from "@mui/material";
import requests from "../api/requests";

export default function ErrorPage() {
  return (
    <Container>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get400Error().catch((error) => console.log(error))
        }
      >
        400 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get401Error().catch((error) => console.log(error))
        }
      >
        401 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get404Error().catch((error) => console.log(error))
        }
      >
        404 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors.get500Error().catch((error) => console.log(error))
        }
      >
        500 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          requests.errors
            .getValidationError()
            .catch((error) => console.log(error))
        }
      >
        Validation Error
      </Button>
    </Container>
  );
}
