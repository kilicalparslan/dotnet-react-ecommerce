import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import requests from "../api/requests";
import { useState } from "react";

export default function ErrorPage() {
  const [ValidationErrors, setValidationErrors] = useState<string[]>([]);

  function handleValidationError() {
    requests.errors
      .getValidationError()
      .then(() => console.log("Validation Error"))
      .catch((errors) => setValidationErrors(errors));
  }

  return (
    <Container>
      {ValidationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {ValidationErrors.map((error, index) => (
              <ListItem key={index}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
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
        onClick={handleValidationError}
      >
        Validation Error
      </Button>
    </Container>
  );
}
