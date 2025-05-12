import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../api/requests";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../cart/cartSlice";
import { LoadingButton } from "@mui/lab";

const steps = ["Delivery Information", "Payment", "Order Summary"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleNext(data: FieldValues) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        setOrderId(await requests.order.createOrder(data));
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }
  return (
    <FormProvider {...methods}>
      <Paper>
        <Grid container spacing={4}>
          {activeStep !== steps.length && (
          <Grid
            size={4}
            sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}
          >
            <Info />
          </Grid>
          )}
          <Grid size={activeStep !== steps.length ? 8: 12} sx={{ p: 3 }}>
            <Box>
              <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box>
              {activeStep === steps.length ? (
                <Stack spacing={2}>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Thank you. We have received your order.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your order number is <strong>#{orderId}</strong>. We will
                    send an e-mail when your order is prepared.
                  </Typography>
                  <Button
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    variant="contained"
                  >
                    List all orders
                  </Button>
                </Stack>
              ) : (
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box>
                    <Box
                      sx={[
                        {
                          display: "flex",
                        },
                        activeStep !== 0
                          ? { justifyContent: "space-between" }
                          : { justifyContent: "flex-end" },
                      ]}
                    >
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRounded />}
                          variant="contained"
                          onClick={handlePrevious}
                        >
                          Back
                        </Button>
                      )}
                      <LoadingButton
                        type="submit"
                        loading={loading}
                        startIcon={<ChevronRightRounded />}
                        variant="contained"
                      >
                        {activeStep == 2 ? "Complete Order" : "Next"}
                      </LoadingButton>
                    </Box>
                  </Box>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}
