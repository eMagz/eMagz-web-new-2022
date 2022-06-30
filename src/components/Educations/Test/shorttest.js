import React, { useState, useEffect } from "react";
import "./test.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Header from "../Header";
import Axios from "axios";
import { BaseUrl } from "../../API";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from "@material-ui/core/Button";
import swal from "sweetalert";

const Test = (props) => {
  const [value, setValue] = useState("");
  const [showtext, setShowtext] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [resdata, setResdata] = useState([]);
  const [textword, setTextWord] = useState("");
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [countword, setCountWord] = useState(0);

  const testdata = JSON.parse(localStorage.getItem("education"));
  // const handleTextAreaChange=(e)=>{

  // console.log('tt',textword)

  // setTextWord(e.target.value);

  // }

  console.log("prs", props.location.state);
  const handleChange = (event, myindex) => {
    setResdata((data) => {
      const newlist = data.map((item, index) => {
        if (index === myindex) {
          item.myanswer = event.target.value;
        }
        return item;
      });
      return newlist;
    });
  };
  const handleTextAreaChange = (event, myindex) => {
    setResdata((data) => {
      const newlist = data.map((item, index) => {
        if (index === myindex) {
          item.myanswer = event.target.value;
        }
        return item;
      });
      return newlist;
    });
  };
  // console.log('f',value)

  console.log("ww", activeStep, resdata.length);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    let education = JSON.parse(localStorage.getItem("education"));
    Axios.post(`${BaseUrl}/testattend`, {
      TestId: props.location.state,
      user_id: education.data.user_id,
      school_id: education.data.school_id,
    }).then((res) => {});

    Axios.get(`${BaseUrl}/questionlist/${props.location.state}`).then((res) => {
      const newList = res.data.data.map((item) => ({ ...item, myanswer: "" }));
      setResdata(newList);
    });
  }, []);

  console.log("mm", resdata);

  const maxNames = resdata.length;

  // const handleNext = () => {
  //   activeStep=== 0 ? setActiveStep(-200*(maxNames-1)): setActiveStep(activeStep+200);
  //   //  console.log('s',-100*(maxNames-1))
  //   setActiveStep(activeStep + 200);
  // };

  const handleBack = () => {
    // console.log('c', activeStep)
    activeStep === -200 * (maxNames - 1)
      ? setActiveStep(0)
      : setActiveStep(activeStep - 200);
    // console.log('q',(-200*(maxNames+1))+2200)
    setActiveStep(activeStep - 200);
  };

  // console.log('w',activeStep)

  const onSubmit = () => {
    const answers = resdata.map((item) => {
      return {
        question_id: item._id,
        answer: item.myanswer,
      };
    });
    console.log("pp", answers);
    Axios.post(`${BaseUrl}/testanswer`, {
      answers,
      user_id: testdata.data.user_id,
      school_id: testdata.data.school_id,
      TestId: props.location.state,
    }).then((res) => {
      if (res.data.status === true) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
    });
  };

  return (
    <>
      <Header />

      <div className="container_carousel">
        {/* <div   style={{ transform:`translateX(${activeStep}%)`,transition:'0.5s'}}> */}

        {resdata.map(
          (item, index) =>
            //  console.log('dd',item)
            index === activeStep && (
              <Slider style={{ height: "100%", width: "100vw" }} {...settings}>
                <div className="test_container" key={index}>
                  <div className="marks_area">Marks {item.marks}</div>
                  <div className="question_area">
                    <div className="question">
                      {item.questionno}. {item.question}
                    </div>
                  </div>

                  <div className="ans_section">
                    {item.is_long === false ? (
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          value={item.myanswer}
                          onChange={(e) => {
                            e.persist();
                            handleChange(e, index);
                          }}
                        >
                          <FormControlLabel
                            value={item.option1}
                            control={<Radio />}
                            label={item.option1}
                          />
                          <FormControlLabel
                            value={item.option2}
                            control={<Radio />}
                            label={item.option2}
                          />
                          <FormControlLabel
                            value={item.option3}
                            control={<Radio />}
                            label={item.option3}
                          />
                          <FormControlLabel
                            value={item.option4}
                            control={<Radio />}
                            label={item.option4}
                          />
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <div>
                        {" "}
                        <div className="long_ans">
                          <textarea
                            value={item.myanswer}
                            onChange={(e) => {
                              e.persist();
                              handleTextAreaChange(e, index);
                            }}
                          />
                        </div>
                        <div className="word_count">{textword.length}/300</div>
                      </div>
                    )}
                  </div>
                </div>
              </Slider>
            )
        )}
      </div>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "0px 20px" }}>
          {activeStep > 0 && (
            <Button
              onClick={() => setActiveStep((prev) => prev - 1)}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
          )}
        </div>

        <div style={{ padding: "0px 20px" }}>
          {activeStep < resdata.length - 1 ? (
            <Button
              onClick={() => setActiveStep((prev) => prev + 1)}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          ) : (
            <Button onClick={onSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Test;
