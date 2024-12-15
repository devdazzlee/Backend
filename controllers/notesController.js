import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user.id,
    });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await note.remove();
    res.json({ message: 'Note removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
