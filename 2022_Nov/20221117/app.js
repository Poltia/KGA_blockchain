/*

가나쉬에서 curl을 사용해서 요청을 보내고 확인하는 방법

curl은 Client URL의 약자
클라이언트에서 소스코드를 손쉽게 웹 브라우저처럼 활용할 수 있게 해주는 기술
서버 통신 할 수 있는 커맨드 명령어 툴이다. 웹개발에서 많이 사용되는 기술
다양한 프로토콜을 지원한다는 장점이 있다.

curl에서 지원하는 프로토콜은
DICT, FILE, FTP, FTPS, Gopher, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, SSL 등등

url을 가지고 할 수 있는건 웬만하면 다 할 수 있다고 보면 된다.
HTTP 프로토콜을 사용해서 페이지의 데이터를 가져온다거나 파일을 다운 받을 수도 있다.
curl [-option] 페이지 주소 를 쓰면 페이지의 소스가 화면에 출력된다.

npx ganache-cli 로 실행
curl -X POST -H "content-type:application/json" --data "{id : yang}" http://localhost:3000

-X _요청 메소드_
-H _요청 헤더 내용_
-data, -d _요청 바디 내용 작성_


가나쉬로 생성한 이더리움 클라이언트에 curl을 사용해서 RPC 요청을 보내보자!
request body의 내용
{
    "id": 1215 // 체인의 아이디. 있어도 되고 없어도 된다.
    "jsonrpc": "2.0" // json으로 인코딩. _필수_
    "method": "eth_accounts" // 이더리움 클라이언트에 구성되어 있는 메소드명. _필수_
    "params": [] // 메소드의 인자 값
}

계정 가져오기
curl -X POST -H "Content-type : application/json" --data '{ "jsonrpc": "2.0", "method": "eth_accounts", "params": [] }' http://localhost:8545

잔액 조회하기
잔액을 조회하는 함수 이름은 "eth_getBalance"
"eth_getBalance" 함수는 params로 매개변수 2개를 전달하고
첫번째 매개변수에는 계정의 주소,
두번째 매개변수에는 몇번째 블록을 조회할 것인지
curl -X POST -H "Content-type:application/json" --data '{ "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0x33b44eaaa2ee41971434fee0f2e4762f51327850", "latest"] }' http://localhost:8545

ㄴ 이더리움 클라이언트에게 RPC를 요청 보내는 방법이다.

Web3 라이브러리
Web3.js 라는 라이브러리를 제공받아서 이더리움 네트워크와 상호작용을 할 수 있는 다양한 함수를 사용할 수 있다.
(위에서 해본 RPC요청을 쉽게 보낼 수 있게 해주는 라이브러리)


// npm init -y // packjson을 만들고
// npm install -D jest // jest를 설치하고
// npm install web3 // Web3 라이브러리 설치

package.json 에서
"test": "jest" // 이렇게 변경
jest.config.js // jest 설정값을 넣을 파일 생성

ethereumjs-tx 라이브러리 설치
// npm install ethereumjs-tx

*/

/* 메타마스크 연결하기
메타마스크 네트워크 추가하고
프론트랑 메타마스크 연결

네트워크 추가 누르고
수동으로 추가
네트워크 이름 본인이 지정
가나쉬 URL 넣어주고 http://127.0.0.1:8545
체인아이디는 기본으로 1337 이고
변경하고 싶으면
npx ganache-cli --chainId "_원하는 체인아이디_"
통화기호는 ETH

네트워크 이름 : 원하는 대로
새 RPC URL : http://127.0.0.1:8545
체인 ID : 1337
통화 기호 : ETH

프론트와 메타마스크 연결
Dapp을 만드는 기초 작업중 하나
트랜잭션을 보낼 때 사용자의 개인키를 사용해서 서명을 만드는 과정을 거쳐 개인키를 서버에 저장하는 것은 많이 위험하기 때문에
메타마스크와 같은 지갑 프로그램을 사용한다.

사용자의 개인키는 메타마스크가 주체가 되고 프론트에서 메타마스크에 요청을 주고
요청을 메타마스크가 받아서 사용자의 개인키를 이용해 서명을 만들어 트랜잭션을 발생 시킨 후
블록체인 네트워크로 요청을 보낸다.
메타마스크는 프론트에서 보낸 요청을 트랜잭션으로 발생시켜 블록체인 네트워크로 보낸다

// 요청
프론트 -> input -> 메타마스크(지갑) -> 블록체인 네트워크
                 ㄴ사용자의 개인키를 이용해서 서명을 만들고 전달받은 데이터와 서명을 합쳐서 블록체인 네트워크로 전달
// 응답
블록체인 네트워크 -> 메타마스크(지갑) -> 프론트

프론트 서버에서 메타마스크가 서로 요청/응답 받을 수 있게 만들어 주기만 하면 된다.

예예예)
쇼핑몰에 상품들이 등록되어 있고 사용자가 코인이나 토큰으로 구매를 할 때
상품데이터까지 블록체인 네트워크에 저장하면 비효율적이기 때문에
프론트, 백엔드 같이 구현해서 상품 데이터는 데이터베이스에 저장하고
상품목록을 불러오고 특정 상품의 정보들을 가져올 때 백엔드 서버에 요청해서 가져오는 방식

프론트에서 메타마스크로 바로 요청을 보내서 트랜잭션을 발생시키는 방법.
백엔드에서 서명을 제외한 트랜잭션 객체를 만들어서 프론트에 전달하고
프론트에서 백엔드로부터 받은 트랜잭션 객체를 메타마스크로 전달해 서명과 함께 트랜잭션을 보내는 방법.
백엔드에서 사용자의 개인키를 가지고 서명을 만들어서 서명까지 포함된 트랜잭션을 블록체인 네트워크로 바로 보내는 방법.

중요한건 사용자의 개인키로 서명을 만드는 것이 우리가 아니고 서명을 만들어주는건 메타마스크가 된다는 것

*/