# WorkFlowy to Logseq

The goal of this project is to build a "high-fidelity" WorkFlowy-to-Logseq exporter/importer that preserves things that the built-in WorkFlowy exporter misses, like mirrors, links to other nodes, and so on.

As of this commit, there's much work to do still. Not sure when I'll get around to continuing work on it, but you're welcome to fork this repo and pick up where I left off!

What's done:

- Iterating through the current tree in WorkFlowy and copying data into a tree data structure.
- De-duping mirrored nodes and adding a reference to the source node (`mirrorRoot` property) which can eventually be turned into `{{embed ((id))}}` in Logseq.
- Loading Turndown from unpkg.com to convert WorkFlowy HTML to Markdown.

TODOs before it's useful:

- do conversion of WF HTML to Markdown
- change mirrored nodes to {{embed ((nodeId))}}
- change links to other nodes to ((blockRefs))
	- we lose link text in the process... how to deal with that?
- figure out what to do with the "note" property (Shift+Enter in WorkFlowy)
- do something with completed items (add "DONE" to beginning of block?)
- probably more things I haven't thought of

Further enhancements:

- split children of root node into separate md files
- download exported data as files in browser

> Side note: I frickin' **love** WorkFlowy, and I'm not building this because I'm unhappy with it in general. But I see potential new workflows that Logseq could unlock, and I'm experiencing some FOMO around that. Having this exporter actually makes me feel *more* comfortable with continuing to use WorkFlowy as I experiment with Logseq. Plus, data portability is always a good thing, right?
