import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KeywordAnalysis = ({ keywords }) => {
  // 카테고리 한글 매핑
  const categoryMap = {
    required_skills: '필수 기술 스택',
    responsibilities: '주요 업무',
    qualifications: '자격 요건',
    preferences: '우대사항'
  };

  // 카테고리별 배경색 스타일 매핑
  const categoryStyles = {
    required_skills: 'bg-blue-100 text-blue-800',
    responsibilities: 'bg-green-100 text-green-800',
    qualifications: 'bg-purple-100 text-purple-800',
    preferences: 'bg-orange-100 text-orange-800'
  };

  // 빈 키워드 체크
  if (!keywords || Object.keys(keywords).length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">아직 분석된 키워드가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>키워드 분석 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(keywords).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">
              {categoryMap[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((keyword, index) => (
                <Badge 
                  key={`${category}-${index}`}
                  variant="secondary"
                  className={categoryStyles[category]}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        {/* 키워드 통계 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-600">
              전체 키워드 수: {Object.values(keywords).flat().length}개
            </div>
            <div className="text-gray-600">
              카테고리 수: {Object.keys(keywords).length}개
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysis;