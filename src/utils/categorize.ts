export function categorizeEvent(title: string, notes: string = ''): 'Work' | 'Personal' | 'Other' {
  const workKeywords = ['meeting', 'project', 'client', 'deadline', 'work'];
  const personalKeywords = ['birthday', 'family', 'friends', 'party', 'vacation'];

  const combined = (title + ' ' + notes).toLowerCase();

  if (workKeywords.some(word => combined.includes(word))) return 'Work';
  if (personalKeywords.some(word => combined.includes(word))) return 'Personal';
  return 'Other';
}
