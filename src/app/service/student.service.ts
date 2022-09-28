import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:8080/';

  GetQuestionsByTypeAndLevel(
    type: string | null | undefined,
    level: string | null | undefined,
    teacherId: string | null
  ) {
    return this.http.get(
      this.baseURL + 'questions/' + type + '/' + level + '/' + teacherId
    );
  }

  GetStudentRank(id: string | null) {
    return this.http.get(this.baseURL + 'student/rank/' + id);
  }

  IsQuestionCompleted(id: string | null, quizId: string | null) {
    return this.http.get(this.baseURL + 'student/' + id + '/' + quizId);
  }

  ValidateUserName(username: string | null | undefined) {
    return this.http.get(this.baseURL + 'student/username/' + username);
  }

  UpdateMarks(id: string | null, answerData: any) {
    return this.http.put(this.baseURL + 'student/marks/' + id, answerData);
  }

  UpdateComment(id: string | null, studentData: any) {
    return this.http.put(this.baseURL + 'student/comment/' + id, studentData);
  }

  UpdateLevelStatus(
    id: string | null,
    type: string | null | undefined,
    level: number,
    status: string
  ) {
    return this.http.put(
      this.baseURL +
        'student/levels/status/' +
        id +
        '/' +
        type +
        '/' +
        level +
        '/' +
        status,
      null
    );
  }

  GetLeaderboardData() {
    return this.http.get(this.baseURL + 'students');
  }

  GetLevelData(id: string | null, type: string | null) {
    return this.http.get(this.baseURL + 'student/levels/' + id + '/' + type);
  }

  GetLevelMarks(
    studentId: string | null,
    type: string | null | undefined,
    level: number
  ) {
    return this.http.get(
      this.baseURL + 'student/marks/' + studentId + '/' + type + '/' + level
    );
  }

  ForgotPassword(email: string | null | undefined) {
    return this.http.get(this.baseURL + 'student/forgot-password/' + email);
  }

  ResetPassword(email: string | null | undefined, password: string) {
    return this.http.put(
      this.baseURL + 'student/reset-password/' + email + '/' + password,
      null
    );
  }
}
