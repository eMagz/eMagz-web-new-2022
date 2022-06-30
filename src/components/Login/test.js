/* eslint-disable react/react-in-jsx-scope */
<div className="box ">
  <div className="effect8">
    <div className="logincontainer">
      <div style={{ marginTop: "27px", marginBottom: "20px" }}>
        <div className="logoimg">
          <img alt="" className="loginImg" src={Logo} />
        </div>
      </div>
      <div className="form">
        <div style={{ width: "400px" }}>
          <form>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              //variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              //variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              style={{
                backgroundColor: "#ED3237",
                color: "white",
                width: "400px",
                margin: "20px 0px",
              }}
              endIcon={<LockIcon>login</LockIcon>}
              variant="contained"
              size="large"
              color="primary"
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
      <div className="forgetlink">
        <Link
          onClick={() => {
            redirect("/forget-password");
          }}
        >
          Forget Password?
        </Link>
      </div>
      <div className="signup">
        <Link
          onClick={() => {
            redirect("/register");
          }}
        >
          I don't have account Sign up
        </Link>
      </div>
      <br />
      <br />
    </div>
  </div>
</div>;
