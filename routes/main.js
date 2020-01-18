const express = require('express');
const router = express.Router();

router.get('/',(req,res) => res.render('index'));

router.get('/home',(req,res) => res.render('index'));

router.get('/rot13',(req,res) => res.render('rot13'));

router.get('/rotation',(req,res) => res.render('rotation'));

router.get('/morse',(req,res) => res.render('morse'));

router.get('/base64',(req,res) => res.render('base64'));

router.get('/about',(req,res) => res.render('about'));


module.exports = router;