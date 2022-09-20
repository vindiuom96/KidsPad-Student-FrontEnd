import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import { NoQuestionsComponent } from '../../dialog/no-questions/no-questions.component';
declare let alertify: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {}

  gameTypeId: string | null | undefined;
  level: any;
  questions: any;
  isDisableSubmit: boolean = true;
  isDisableNext: boolean = true;
  isDisabledAnswers: boolean = false;
  selectAnswer: any = 'underline';
  questionIndex: number = 0;
  answerData: any = [];
  answerStatus: string = '';
  isLevelCompleted: boolean = false;
  nextLevel: number = 0;
  symbol: string = '';
  levelMarks: number = 0;

  // currentQuestion: string = '';
  completedQuestion: boolean = false;
  quizId: string = '';

  firstNumber: string = '';
  secondNumber: string = '';
  answerOne: string = '';
  answerTwo: string = '';
  answerThree: string = '';
  answerFour: string = '';
  correctAnswer: string = '';
  selectedAnswer: string = '';

  styleCorrectAnswer: any = {
    'background-color': 'green',
    color: 'white',
    border: 'none',
  };
  styleChosenAnswer: any = { border: '3px solid #ff2d2d' };

  styleAns1: any = {};
  styleAns2: any = {};
  styleAns3: any = {};
  styleAns4: any = {};
  isMute: boolean = true;
  audio = new Audio();

  ngOnInit(): void {
    this.gameTypeId = this.route.snapshot.paramMap.get('type');
    this.level = this.route.snapshot.paramMap.get('level');
    this.questionIndex = 0;
    this.commonService.StopAudio();
    this.isMute = this.commonService.isMute;
    this.nextLevel = 1;

    //click audio
    this.audio.src = '../assets/audio clips/click.wav';
    this.audio.load();

    this.ChangeSymbol();
    this.GetLevelQuestions();
  }

  GetLevelQuestions() {
    this.questions = [];
    this.studentService
      .GetQuestionsByTypeAndLevel(
        this.gameTypeId,
        this.level.split('l')[1],
        localStorage.getItem('teacherId')
      )
      .subscribe((res: any) => {
        if (res != null && res.length > 0) {
          this.questions = res;
          this.quizId = res[0].quizId;
          this.firstNumber = res[0].firstNumber;
          this.secondNumber = res[0].secondNumber;
          this.answerOne = res[0].firstAnswer;
          this.answerTwo = res[0].secondAnswer;
          this.answerThree = res[0].thirdAnswer;
          this.answerFour = res[0].forthAnswer;
          this.correctAnswer = res[0].correctAnswer;
          this.CheckQuestionCompleted();
        } else {
          this.isDisabledAnswers = true;
          console.error('No questions in this level');
          this.dialog.open(NoQuestionsComponent, {
            // data: { studentId: studentId },
            disableClose: true,
            height: '200px',
            width: '600px',
          });
        }
      });
  }

  SelectAnswer(val: string, event: any) {
    this.selectedAnswer = val;
    this.isDisableSubmit = false;

    this.RemoveSelectedAnswer();
    document.getElementById(event.target.id)?.classList.add('selected-answer');
  }

  RemoveSelectedAnswer() {
    document.getElementById('ans1')?.classList.remove('selected-answer');
    document.getElementById('ans2')?.classList.remove('selected-answer');
    document.getElementById('ans3')?.classList.remove('selected-answer');
    document.getElementById('ans4')?.classList.remove('selected-answer');
  }

  CheckAnswer() {
    this.isDisableSubmit = true;
    this.isDisabledAnswers = true;
    this.questionIndex += 1;

    this.RemoveSelectedAnswer();

    //correct answer
    this.ChangeAnswerStyles(this.selectedAnswer, this.styleChosenAnswer);

    //chosen answer
    this.ChangeAnswerStyles(this.correctAnswer, this.styleCorrectAnswer);

    if (this.correctAnswer == this.selectedAnswer) {
      this.answerStatus = 'c';
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Correct Answer');

      //play correct audio
      let audio = new Audio();
      audio.src = '../assets/audio clips/correct.mp3';
      audio.load();
      audio.play();
    } else {
      this.answerStatus = 'w';
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Incorrect Answer');

      //play wrong audio
      let audio = new Audio();
      audio.src = '../assets/audio clips/wrong.mp3';
      audio.load();
      audio.play();
    }
    this.UpdateAnswer();

    if (this.questions.length - 1 >= this.questionIndex) {
      this.isDisableNext = false;
    } else {
      this.ResetAnswerStyles()
      //this.RemoveSelectedAnswer();
      this.LevelCompleted();
    }
  }

  UpdateAnswer() {
    this.answerData.push({
      quizId: this.quizId,
      selectedAnswer: this.selectedAnswer,
      quizLvl: this.level.split('l')[1],
      quizType: this.gameTypeId,
      quizNo: this.questionIndex,
      ansStatus: this.answerStatus,
      studentId: localStorage.getItem('studentId'),
      marks: this.answerStatus == 'c' ? this.level.split('l')[1] * 5 : 0,
    });

    this.levelMarks +=
      this.answerStatus == 'c' ? this.level.split('l')[1] * 5 : 0;

    this.studentService
      .UpdateMarks(
        localStorage.getItem('studentId'),
        this.answerData[this.answerData.length - 1]
      )
      .subscribe((res) => {
        console.log('current marks', res);
      });
  }

  DisplayNextQuestion() {
    this.ResetAnswerStyles();
    this.RemoveSelectedAnswer();
    if (this.questions.length - 1 >= this.questionIndex) {
      // this.currentQuestion = this.questions[this.questionIndex].quizDesc;
      this.quizId = this.questions[this.questionIndex].quizId;
      this.firstNumber = this.questions[this.questionIndex].firstNumber;
      this.secondNumber = this.questions[this.questionIndex].secondNumber;
      this.answerOne = this.questions[this.questionIndex].firstAnswer;
      this.answerTwo = this.questions[this.questionIndex].secondAnswer;
      this.answerThree = this.questions[this.questionIndex].thirdAnswer;
      this.answerFour = this.questions[this.questionIndex].forthAnswer;
      this.correctAnswer = this.questions[this.questionIndex].correctAnswer;
      this.isDisableNext = true;
      this.isDisabledAnswers = false;
      this.selectAnswer = undefined;
      this.CheckQuestionCompleted();
    } else {
      this.nextLevel += 1;
      this.LevelCompleted();
    }
  }

  CheckQuestionCompleted() {
    this.studentService
      .IsQuestionCompleted(localStorage.getItem('studentId'), this.quizId)
      .subscribe((res: any) => {
        if (res != false) {
          this.isDisableNext = false;
          this.questionIndex += 1;
          this.completedQuestion = true;
          this.levelMarks += res[0].marks;

          //correct answer
          this.ChangeAnswerStyles(
            res[0]?.selectedAnswer,
            this.styleChosenAnswer
          );

          //chosen answer
          this.ChangeAnswerStyles(this.correctAnswer, this.styleCorrectAnswer);
        } else {
          this.completedQuestion = false;

          // let file =
          //   this.gameTypeId + '-' + this.level + '-' + this.questionIndex;
          // this.commonService.StopAudio();
          // this.commonService.PlayAudio(
          //   '../assets/audio clips/' + file + '.m4a'
          // );
        }
      });
  }

  ResetAnswerStyles() {
    this.styleAns1 = {};
    this.styleAns2 = {};
    this.styleAns3 = {};
    this.styleAns4 = {};
  }

  ChangeAnswerStyles(value1: string, style: any) {
    if (value1 == this.answerOne) {
      this.styleAns1 = style;
    } else if (value1 == this.answerTwo) {
      this.styleAns2 = style;
    } else if (value1 == this.answerThree) {
      this.styleAns3 = style;
    } else if (value1 == this.answerFour) {
      this.styleAns4 = style;
    }
  }
  ChangeSymbol() {
    if (this.gameTypeId == 'add') {
      this.symbol = '+';
    } else if (this.gameTypeId == 'subtract') {
      this.symbol = '-';
    } else if (this.gameTypeId == 'multiply') {
      this.symbol = 'x';
    } else if (this.gameTypeId == 'divide') {
      this.symbol = '÷';
    }
  }

  LevelCompleted() {
    //this.RemoveSelectedAnswer();
    //get current level marks
    // this.studentService
    //   .GetLevelMarks(
    //     localStorage.getItem('studentId'),
    //     this.gameTypeId,
    //     this.level.split('l')[1]
    //   )
    //   .subscribe((res) => {
    //     this.levelMarks = parseInt(res.toString());
    //   });

    //update completed level status
    this.studentService
      .UpdateLevelStatus(
        localStorage.getItem('studentId'),
        this.gameTypeId,
        this.level.split('l')[1],
        'complete'
      )
      .subscribe(() => {
        console.log('level status update');
      });

    let type = '';
    if (this.gameTypeId == 'add') {
      type = 'Addition';
    } else if (this.gameTypeId == 'subtract') {
      type = 'Subtraction';
    } else if (this.gameTypeId == 'multiply') {
      type = 'Multiplication';
    } else if (this.gameTypeId == 'divide') {
      type = 'Division';
    }

    this.isLevelCompleted = true;
  }

  NextLevel() {
    this.isLevelCompleted = false;
    this.level = 'l' + (parseInt(this.level.split('l')[1]) + 1);
    this.isDisabledAnswers = false;
    this.completedQuestion = false;
    this.questionIndex = 1;
    this.quizId = '';
    this.firstNumber = '';
    this.secondNumber = '';
    this.answerOne = '';
    this.answerTwo = '';
    this.answerThree = '';
    this.answerFour = '';
    this.correctAnswer = '';
    this.GetLevelQuestions();
  }

  NavigateHome() {
    this.router.navigate(['student-home']);
  }

  ToggleMute() {
    this.commonService.ToggleMute();
    this.isMute = this.commonService.isMute;
  }

  ClickAudio() {
    this.audio.play();
  }
}
