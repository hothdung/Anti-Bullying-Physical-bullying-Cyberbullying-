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
                    <th>Accuracy</th>
                    <th>Check</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>studentdsfrot</td>
                    <td>99</td>
                    <td>사람들이 능력이 없어서 그런거 아니야</td>
                    <td>NEUTRAL</td>
                    <td>서울 관악구 대학동</td>
                    <td>2020-05-24 23:23:24</td>
                    <td>Not Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentPIgjWF</td>
                    <td>80</td>
                    <td>여기 너무 예뻐요 당연하죠 전 캘리포니아보다 여기 훨씬 더 좋아요</td>
                    <td>POSITIVE</td>
                    <td>서울 관악구 대학동</td>
                    <td>2020-05-27 22:54:33</td>
                    <td>Not Bullying </td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentrqkzUq</td>
                    <td>100</td>
                    <td>착각하지 마 그냥 데리거야</td>
                    <td>NEGATIVE</td>
                    <td>서울 특별시 강남구 강남대로 122 길 60</td>
                    <td>2020-05-26 20:37:09</td>
                    <td>Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studenturk7A3</td>
                    <td>105</td>
                    <td>에 신동우 빨리 물 떠와 야 지금 물 빨리 떠오라고!</td>
                    <td>NEGATIVE</td>
                    <td>경기도 이천시 광고 동 196-16</td>
                    <td>2020-05-29 00:08:58</td>
                    <td>Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studenturk7A3</td>
                    <td>94</td>
                    <td>걔가 있잖아 그렇게 말하는 거 10분 해주고 싶고 왜 할래 걔가 뭐가 하려고 학교에서 기다리고 있어 그 거 어쩌라고 걔인데</td>
                    <td>NEGATIVE</td>
                    <td>경기도 이천시 광고 동 196-16</td>
                    <td>2020-05-29 00:10:59</td>
                    <td>Not Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studenturk7A3</td>
                    <td>96</td>
                    <td>안 한다고! 미친. 하지마. 너야 신동우 너 누나 11시까지 잤을 것 같으면 그 다음에 여행가라 질러하지마 질러자지마 진짜 네가 돕지 않았잖아 네가 돕고 안 하잖아 네가 솔직히 집에서 뭘 도와주는 거 있어? 걸어가. 맨날 걸아가. 미친 걸어갈걸. 걸어가. 너가 11시까지 잤으지마 진짜. 렌트타고 가고! 렌트타고 가 그냥</td>
                    <td>NEGATIVE</td>
                    <td>경기도 이천시 광고 동 196-16</td>
                    <td>2020-05-29 00:13:00</td>
                    <td>Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentnRgJWf</td>
                    <td>94</td>
                    <td>내가 일등이 있어야 되는 왜 내 자리를 뺐어.</td>
                    <td>NEGATIVE</td>
                    <td>서울대 공과 대학</td>
                    <td>2020-05-29 13:22:57</td>
                    <td>Bullying</td>
                    <td> 0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentk5ldHN</td>
                    <td>94</td>
                    <td>인생이 의미가 없어 아아</td>
                    <td>NEGATIVE</td>
                    <td>서울대 공과 대학</td>
                    <td>2020-05-29 14:27:00</td>
                    <td>Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
                <tr>
                    <td>studentk5ldHN</td>
                    <td>70</td>
                    <td>저는 잘 맞아요. 사람마다 좀 다르긴 한데 저는 잘 맞는 것 같아요. 사람들이 한약 별로 안 좋더라고요. 진짜 도움이 되냐? 맞아요.</td>
                    <td>POSITIVE</td>
                    <td>서울 특별시 강남구 강남대로 122 길 60</td>
                    <td>2020-05-29 14:44:10</td>
                    <td>Not Bullying</td>
                    <td>0.9604</td>
                    <td><DoneIcon /></td>
                    <td><ClearIcon /></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default VerificationTable;