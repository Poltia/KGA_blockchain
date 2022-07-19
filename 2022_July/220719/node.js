// @ts-check
// 타입을 체크할것인지 설정

/* npm 설치 관련
formatting, Linting 설정
node 프로젝트를 여럿이나 개인이 작업하다보면 예상하지못한 오류가 생겼을때 찾아내기가 힘들다.
런타임 코드를 이용자에게 전달하기 전에 문제를 잡아준다.

formatting에서 좋은거 prettier
Prettier - Code formatter를 마켓에서 설치

formatting을 해주는 prettier 패키지 설치 명령어
//////////////////////////////////////
npm install --save-dev prettier
//////////////////////////////////////

--save-dev  우리가 프로젝트를 개발할때만 사용할 패키지


npm 패키지를 설치하면 package.json에 내용이 추가되고
package.json의 중요한 역할중에 하나는 메타데이터를 표현하는것도 있는데
현재 프로젝트가 사용하는 의존성 내용을 나열하는 것에도 목적이 있다.

  "devDependencies": {
    "prettier": "^2.7.1"
  }

prettier라는 패키지가 2.7.1 버전으로 설치가 되었다.

노드 모듈 폴더는 git에 따로 올리지 않고
package.json만 올리고
npm i나 npm install로 설치후 작업한다.

package-lock.json에 기록되어 있는 내용은 실제로 설치된 패키지들이 어떤것인지 알려준다.
팀에서 이 프로젝트를 같이 작업을 한다하면 lock.json도 같이 업로드 해주는것이 좋다.
package.json에는 패키지의 버전 앞에 "prettier": "^2.7.1" // ^기호가 있는데,
이 기호는 버전이 정확하지 않아도 설치되게 만들어 준다.

팀원끼리 서로 버전차이가 날수 있는데,
그래서 여러명과 같이 작업할때는 package-lock.json파일을 서로 공유해야 한다.
lock.json에는 설치된 버전이 적혀있기때문이다.


node_modules파일도 생겼는데 npm 설치를 하니까 이 폴더안에 설치되어 있는
.bin폴더를 제외하고 다른 폴더들은 현재 프로젝트가 의존하고 있는 패키지들
.bin폴더는 컴퓨터가 이해할 수 있는 텍스트파일(바이너리파일)들이다.
컴퓨터의 언어가 담긴 파일


formatting을 해보자
설치한 prettier를 사용해서
프로젝트 단위로 설정을 한다.
만들 파일 하나 .prettierrc

.vscode폴더를 만들고 안에 settings.json을 만든다.
이곳에 설정한 이유는 개인이 사용하는 vscode 설정 말고 프로젝트 단위로
설정을 적용 시킬 수 있다.
팀이나 회사에서 작업을 하면서 여러명이 작업할 때 설정 값을 미리 정해놓고
작업을 시작하면 병합시 충돌을 덜어준다.


Linting을 해보자
Linting에서 좋은거 ESLint 패키지이자 플러그인

ESLint 설치 명령어
//////////////////////////////////////////////////
npm install --save-dev eslint
//////////////////////////////////////////////////
--save-dev 개발환경이니까...

lock.json에 무척 많이 생기는데 의존성들(서브 디펜던시)
의존성이란, 코드에서 두 모듈간의 연결이라고 보면 된다.
//클래스가 두개 있다 치면 두 클래스의 관계성
//그냥 쓰려고 패키지 다운받는다고 보면된다.

eslint도 설정파일이 필요한데
이 설정 파일으 확장자가 필요하다. js
설정파일 이름은 .eslintrc.js 이렇게 작성

마켓플레이스에서 ESLint 설치

//rc 뜻은..
//runtime configuration
//run control
//run commands
//runcom
//resource control

*/
