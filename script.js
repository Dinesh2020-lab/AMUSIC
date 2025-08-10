// Simple page-turn logic: clicking Next flips the next page from top to bottom.
// Pages are in DOM order. We flip pages progressively.
document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');
  const pages = Array.from(book.querySelectorAll('.page'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageIndicator = document.getElementById('pageIndicator');

  // We'll treat one cover + N pages + back cover.
  const totalPages = pages.length;
  // currentFlip counts how many pages have been flipped (0..totalPages-1)
  let flipped = 0;

  function updateIndicator(){
    // Show logical page: flipped+1 (cover is page 0 visually). Keep simple mapping
    const logical = Math.min(Math.max(flipped + 1, 1), totalPages);
    pageIndicator.textContent = Page ${logical} / ${totalPages};
  }

  function flipNext(){
    if(flipped >= totalPages - 1) return;
    // flip the next page (pages[flipped] since cover is index 0)
    const pageToFlip = pages[flipped];
    pageToFlip.classList.add('flipped');
    flipped += 1;
    updateIndicator();
  }

  function flipPrev(){
    if(flipped <= 0) return;
    // unflip the previous page
    const pageToUnflip = pages[flipped - 1];
    pageToUnflip.classList.remove('flipped');
    flipped -= 1;
    updateIndicator();
  }

  // Attach controls
  nextBtn.addEventListener('click', flipNext);
  prevBtn.addEventListener('click', flipPrev);

  // Click on a page flips/unflips it (only for topmost flippable pages)
  pages.forEach((p, i) => {
    p.addEventListener('click', (e) => {
      // if this page is the next to flip, do flip
      if(i === flipped){
        flipNext();
      } else if(i === flipped - 1){
        flipPrev();
      } else {
        // ignore other clicks to avoid confusing jumps
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') flipNext();
    if(e.key === 'ArrowLeft') flipPrev();
  });

  // initialize indicator
  updateIndicator();
});