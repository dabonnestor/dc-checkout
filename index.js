import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import photo1 from "./img/photo1.png";
import photo2 from "./img/photo2.png";

const initialData = [
  {
    id: 1,
    title: "Vintage Backbag",
    image: photo1,
    qty: 0,
    price: 54.99,
    origPrice: 94.99,
  },
  {
    id: 2,
    title: "Levi Shoes",
    image: photo2,
    qty: 0,
    price: 74.99,
    origPrice: 124.99,
  },
];

const Container = styled.div`
  max-width: 102.4rem;
  padding: 4.8rem 1.6rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2.4rem 1.6rem;
  }
`;

const Heading = styled.h1`
  font-size: 3.6rem;
  color: #4e5150;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: auto auto;
  align-items: start;
  justify-content: space-between;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    justify-content: initial;
  }
`;

const Notification = styled.div`
  display: flex;
  gap: 1.2rem;
  background-color: ${(props) => (props.error ? "#fed7d7" : "#C6F6D5")};
  color: ${(props) => (props.error ? "#f56565" : "#48BB78")};
  border-radius: 1.2rem;
  padding: 1.6rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StyledForm = styled(Form)`
  max-width: 46.5rem;

  @media (max-width: 768px) {
    max-width: none;
    order: 2;
  }
`;

const FieldSet = styled.fieldset`
  display: block;
  border: 0;
  padding: 0;
  margin: 0;
  margin-top: 4rem;

  &:not(:first-of-type) {
    margin-top: 6.4rem;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;

    &:not(:first-of-type) {
      margin-top: 4rem;
    }
  }
`;

const FieldSetName = styled.h3`
  font-size: 1.8rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 1.6rem;

  &:not(:first-of-type) {
    margin-top: 1.6rem;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  width: 100%;
  color: #4f4f4f;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  color: #828282;
`;

const DropdownIcon = styled.div`
  display: flex;
  background-color: #e0e0e0;
  color: #828282;
  border-radius: 0.4rem;
  user-select: none;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  border: 1px solid #828282;
  border-radius: 1.2rem;
  padding: 0 1.6rem;
  margin-top: 0.6rem;

  &:focus-within {
    border: 1px solid #333;

    ${IconWrapper}, ${DropdownIcon} {
      color: #333;
    }
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 1.6rem;
  color: #333;
  background-color: transparent;
  border: 0;
  border-radius: 1.2rem;
  outline: 0;
  appearance: none;
  text-overflow: ellipsis;
  padding: 1.6rem 0;
  margin: 0;

  &::placeholder {
    color: #828282;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Stepper = styled(Input)`
  cursor: default;
  text-align: center;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  font-size: 1.6rem;
  background-color: transparent;
  color: #333;
  border: 0;
  border-radius: 1.2rem;
  outline: 0;
  appearance: none;
  text-overflow: ellipsis;
  padding: 1.6rem 0;
  margin: 0;

  &::placeholder {
    color: #828282;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InputCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.2rem;
  color: #4f4f4f;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border: 1px solid #828282;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #fff;
`;

const InputCheckbox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 0.1rem;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 0.1rem;

  &:focus ~ {
    ${Checkbox} {
      border: 1px solid #333;
    }
  }

  &:checked ~ {
    ${Checkbox} {
      background-color: #f2994a;
      background-image: url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z' fill='white'/%3E%3C/svg%3E%0A");
      background-size: contain;
      background-position: center center;
      border: 1px solid #f2994a;
    }
  }
`;

const FormGroupCheckbox = styled(FormGroup)`
  margin-top: 2.4rem !important;
`;

const Button = styled.button`
  display: inline-flex;
  font-size: 1.6rem;
  text-align: center;
  background-color: #f2994a;
  color: #fff;
  border: 1px solid #f2994a;
  border-radius: 1.2rem;
  whitespace: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  appearance: none;
  user-select: none;
  max-width: 100%;
  padding: 1.6rem 4rem;
  margin: 0;
`;

const FormGroupButton = styled(FormGroup)`
  display: flex;
  justify-content: flex-end;
  margin-top: 2.4rem !important;
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 1.2rem;
  max-width: 38.3rem;
  padding: 3.2rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    order: 1;
    max-width: none;
    margin-top: 3.2rem;
  }
`;

const CartItem = styled.div`
  display: flex;
  gap: 2rem;

  &:not(:first-of-type) {
    margin-top: 3.2rem;
  }
`;

const CartItemImage = styled.img`
  display: block;
  width: 13.4rem;
  height: 13.6rem;
  object-fit: cover;
  border-radius: 1.3rem;
  margin: 0;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const CartItemTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: #4e5150;
`;

const CartItemPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 0.6rem;
`;

const CartItemMarkdownPrice = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.25;
  color: #f2994a;
`;

const CartItemPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: line-through;
  color: #4e5150;
`;

const CartOverview = styled.div`
  margin-top: 10rem;
`;

const CartShipping = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-top: 1px solid #bdbdbd;
  padding: 0.8rem 0;
`;

const CartShippingHeading = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
`;

const CartShippingPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
`;

const CartTotal = styled(CartShipping)``;

const CartTotalHeading = styled(CartShippingHeading)``;

const CartTotalPrice = styled(CartShippingPrice)``;

const Footer = styled.footer`
  font-size: 1.4rem;
  text-align: center;
  color: #a9a9a9;
  margin-top: 6.4rem;
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const [shipping, setShipping] = useState(19);
  const [total, setTotal] = useState(0 + shipping);

  const initialValues = {
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    isSaveShippingAddress: false,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    fullName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
  });

  const handleIncrement = (item) => {
    setData(
      data.map((i) => {
        if (i.id === item.id) {
          i.qty = i.qty + 1;
        }

        return i;
      })
    );

    setTotal(total + item.price);
  };

  const handleDecrement = (item) => {
    setData(
      data.map((i) => {
        if (i.id === item.id) {
          i.qty = i.qty - 1;
        }

        return i;
      })
    );

    setTotal(total - item.price);
  };

  return (
    <Container>
      <header>
        <Heading>Checkout</Heading>
      </header>
      <Main>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <StyledForm>
              {props.submitCount !== 0 && props.isValid && (
                <Notification>
                  <Fragment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Successfully saved!
                  </Fragment>
                </Notification>
              )}
              {props.submitCount !== 0 && !props.isValid && (
                <Notification error>
                  <Fragment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    All fields is required! Please try again!
                  </Fragment>
                </Notification>
              )}
              <FieldSet>
                <FieldSetName>Contact Information</FieldSetName>
                <Field name="email">
                  {({ field }) => (
                    <FormGroup>
                      <InputLabel>
                        Email
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="email"
                            placeholder="Enter your email..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      </InputLabel>
                    </FormGroup>
                  )}
                </Field>
                <Field name="phone">
                  {({ field }) => (
                    <FormGroup>
                      <InputLabel>
                        Phone
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="tel"
                            placeholder="Enter your phone..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      </InputLabel>
                    </FormGroup>
                  )}
                </Field>
              </FieldSet>
              <FieldSet>
                <FieldSetName> Shipping Address</FieldSetName>
                <Field name="fullName">
                  {({ field }) => (
                    <FormGroup>
                      <InputLabel>
                        Full name
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="text"
                            placeholder="Your full name..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      </InputLabel>
                    </FormGroup>
                  )}
                </Field>
                <Field name="address">
                  {({ field }) => (
                    <FormGroup>
                      <InputLabel>
                        Address
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="text"
                            placeholder="Your address..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      </InputLabel>
                    </FormGroup>
                  )}
                </Field>
                <Field name="city">
                  {({ field }) => (
                    <FormGroup>
                      <InputLabel>
                        City
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="text"
                            placeholder="Your city..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      </InputLabel>
                    </FormGroup>
                  )}
                </Field>
                <FormGroup>
                  <InputLabel>
                    Country
                    <Field name="country">
                      {({ field }) => (
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                          </IconWrapper>
                          <Select placeholder="Your country..." {...field}>
                            <option>Philippines</option>
                            <option>Korea</option>
                            <option>Singapore</option>
                          </Select>
                          <DropdownIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                          </DropdownIcon>
                        </InputWrapper>
                      )}
                    </Field>
                  </InputLabel>
                  <InputLabel>
                    Postal code
                    <Field name="postalCode">
                      {({ field }) => (
                        <InputWrapper>
                          <IconWrapper>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M-618-3000H782V600H-618zM0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                            </svg>
                          </IconWrapper>
                          <Input
                            type="text"
                            placeholder="Your postal code..."
                            {...field}
                          ></Input>
                        </InputWrapper>
                      )}
                    </Field>
                  </InputLabel>
                </FormGroup>
                <Field name="isSaveShippingAddress">
                  {({ field }) => (
                    <FormGroupCheckbox>
                      <InputCheckboxLabel>
                        <InputCheckbox type="checkbox" {...field} />
                        <Checkbox>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                          </svg>
                        </Checkbox>
                        Save this information for next time
                      </InputCheckboxLabel>
                    </FormGroupCheckbox>
                  )}
                </Field>
              </FieldSet>
              <FormGroupButton>
                <Button type="submit">Continue</Button>
              </FormGroupButton>
            </StyledForm>
          )}
        </Formik>
        <Cart>
          {data.map((item) => {
            return (
              <CartItem key={item.id}>
                <CartItemImage src={item.image}></CartItemImage>
                <CartItemDetails>
                  <div>
                    <CartItemTitle>{item.title}</CartItemTitle>
                    <CartItemPriceWrapper>
                      <CartItemMarkdownPrice>
                        {`$${item.price}`}
                      </CartItemMarkdownPrice>
                      <CartItemPrice>{`$${item.origPrice}`}</CartItemPrice>
                    </CartItemPriceWrapper>
                  </div>
                  <InputWrapper>
                    <DropdownIcon
                      onClick={() =>
                        item.qty === 0 ? null : handleDecrement(item)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 13H5v-2h14v2z" />
                      </svg>
                    </DropdownIcon>
                    <Stepper type="text" value={item.qty} readOnly />
                    <DropdownIcon onClick={() => handleIncrement(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </DropdownIcon>
                  </InputWrapper>
                </CartItemDetails>
              </CartItem>
            );
          })}
          <CartOverview>
            <CartShipping>
              <CartShippingHeading>Shipping</CartShippingHeading>
              <CartShippingPrice>{`$${shipping.toFixed(2)}`}</CartShippingPrice>
            </CartShipping>
            <CartTotal>
              <CartTotalHeading>Total</CartTotalHeading>
              <CartTotalPrice>{`$${total.toFixed(2)}`}</CartTotalPrice>
            </CartTotal>
          </CartOverview>
        </Cart>
      </Main>
      <Footer>dabonnestor @devchallenges.io</Footer>
    </Container>
  );
};

const mountNode = document.getElementById("app");

ReactDOM.render(<App />, mountNode);
