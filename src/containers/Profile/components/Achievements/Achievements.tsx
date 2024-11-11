import { Carousel, Card, Progress } from 'antd';

const achievements = [
  { title: '100 Games', progress: 10, description: 'Dosáhni 100 zápasů' },
  { title: '50 Flags', progress: (12 / 50) * 100, description: 'Dosáhni 50 vlajek' },
  { title: '100 Kills', progress: 50, description: 'Dosáhni 100 zabití' },
  { title: '10 Wins', progress: (6 / 10) * 100, description: 'Dosáhni 10 výher' },
  { title: '10 Achievements', progress: 80, description: 'Dosáhni 10 achievementů' },
  { title: 'Top 3 place', progress: 20, description: 'Buď alespoň 10 dní v TOP 3' },
  { title: '50 Flags', progress: 50, description: 'Dosáhni 50 vlajek' },
  { title: '50 Flags', progress: 50, description: 'Dosáhni 50 vlajek' },
];

export const AchievementProgress = () => {
  // Rozdělíme achievements do skupin po 6 prvcích
  const chunkedAchievements = [];
  for (let i = 0; i < achievements.length; i += 7) {
    chunkedAchievements.push(achievements.slice(i, i + 7));
  }

  return (
    <Carousel>
      {chunkedAchievements.map((chunk, index) => (
        <div key={index}>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {chunk.map((achiev, idx) => (
              <Card key={idx} title={achiev.title} bordered={false} style={{ width: 240, textAlign: 'center' }}>
                <p>{achiev.description}</p>
                <Progress percent={achiev.progress} status="active" strokeColor="#063970" />
              </Card>
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  );
};
