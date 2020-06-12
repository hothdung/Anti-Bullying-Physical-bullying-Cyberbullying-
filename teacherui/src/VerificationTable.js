import React from 'react';
import { Table } from 'reactstrap';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear'



const VerificationTable = (props) => {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>StudId</th>
                    <th>Heart rate</th>
                    <th>Text</th>
                    <th>Polarity</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Bullying</th>
                    <th>    Check</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>studentdsfrot</td>
                    <td>80</td>
                    <td>사람들이 능력이 없어서 그런거 아니야</td>
                    <td>NEUTRAL</td>
                    <td>서일중학교 운동장</td>
                    <td>2020-05-24 18:20:22</td>
                    <td>Not Bullying </td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentPIgjWF</td>
                    <td>80</td>
                    <td>여기 너무 예뻐요 당연하죠 전 캘리포니아보다 여기 훨씬 더 좋아요</td>
                    <td>POSITIVE</td>
                    <td>이천시부발읍현대아파트</td>
                    <td>2020-05-27 22:54:33</td>
                    <td>Not Bullying </td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>student6fV21d</td>
                    <td>102</td>
                    <td>제발 다시는 학교에서 안 봤으면 한다</td>
                    <td>NEGATIVE</td>
                    <td>서울외국어고등학교</td>
                    <td>2020-05-28 15:22:22</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentrqkzUq</td>
                    <td>105</td>
                    <td>착각하지 마 때리는 거야</td>
                    <td>NEGATIVE</td>
                    <td>동부이촌동아파트</td>
                    <td>2020-05-28 20:22:22</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentrqkzUq</td>
                    <td>101</td>
                    <td>미친 진짜 하지마. 제일 힘들어 지금 삶이 힘들다 삶이 힘들다 </td>
                    <td>NEGATIVE</td>
                    <td>이천시부발읍현대아파트</td>
                    <td>2020-05-28 21:19:22</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studenturk7A3</td>
                    <td>103</td>
                    <td>에 신동우! 가서 물떠와! 물떠오라고 빨리!</td>
                    <td>NEGATIVE</td>
                    <td>이천시부발읍현대아파트</td>
                    <td>2020-05-28 21:19:22</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studenturk7A3</td>
                    <td>100</td>
                    <td>안 한다고 미친 진짜 하지마! 너야 신동우 너가 토요일날 11시까지 데려가줘 그다음에 여행가라 질러하지마. 질러하지마! 질러하지마 진짜. 집에서 뭘 도와주는 거 있어? 걸어가! 걸아가! 너가 돕고 안 하잖아. 안 하다고! 맨날 걸어가 맨날 걸어가! 미친 걸어갈 걸. 렌트가로 타고 가고! 렌트타고 가 그냥!</td>
                    <td>NEGATIVE</td>
                    <td>이천시부발읍현대아파트</td>
                    <td>2020-05-29 00:08:28</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentk5ldHN</td>
                    <td>102</td>
                    <td>저는 잘 맞아요. 사람마다 좀 다르긴 한데 저는 잘 맞는 것 같아요. 사람들이 한약 별로 안 좋더라고요. 진짜 도움이 되냐? 맞아요.</td>
                    <td>NEGATIVE</td>
                    <td>서울외국어고등학교</td>
                    <td>2020-05-29 14:44:10</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentnRgJWf</td>
                    <td>99</td>
                    <td>왜 이렇게 사는 게 힘들기만 한지 누가 세상에 아름답다고 말한 건지 태어났을 때부터 삶이 내게 준 배치 문제 너무 힘들어 너도 걔 이제 돌아가 이제 끝나면</td>
                    <td>NEGATIVE</td>
                    <td>이천시부발읍현대아파트</td>
                    <td>2020-05-29 13:21:57</td>
                    <td>Bullying</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default VerificationTable;