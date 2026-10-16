"""Rebuild browser data after editing the structured content source."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'content.json').read_text(encoding='utf-8'))
lessons = data['lessons']
assert len(lessons) == 100 and len({l['id'] for l in lessons}) == 100
(root / 'data.js').write_text('window.LESSONS=' + json.dumps(lessons, ensure_ascii=False) + ';\n', encoding='utf-8')
print('Rebuilt data.js: 100 lessons')
