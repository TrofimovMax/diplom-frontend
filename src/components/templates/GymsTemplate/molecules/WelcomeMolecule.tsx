import React from "react";
import {Grid, Typography} from "@mui/material";

const WelcomeMolecule: React.FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant="h6" gutterBottom={true}>
          Добро пожаловать в спортивный комплекс "Спорткомплекс"!
          Мы рады предложить вам три зала, каждый из которых предназначен для разных видов занятий.
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          Если вы хотите улучшить свою гибкость и научиться контролировать своё тело,
          то зал для йоги идеально подходит для вас.
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          Если ваша цель - набрать мышечную массу и стать сильнее,
          то зал для бодибилдинга станет вашим надежным помощником.
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          А если вы стремитесь к стройной фигуре и хотите укрепить своё здоровье,
          то зал для фитнеса будет идеальным выбором.
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          Наши квалифицированные инструкторы всегда готовы помочь вам достичь ваших целей и привести ваше тело в
          форму.
          Начните свой путь к здоровому образу жизни вместе с нами!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeMolecule;