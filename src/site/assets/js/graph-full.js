// Full-vault graph for /graph page.
// Uses Force Graph (vasturiano) and existing /graph.json nodes/links.

(function () {
  function toArrayGraphData(raw) {
    if (!raw || typeof raw !== "object") return { nodes: [], links: [] };
    const nodes = Array.isArray(raw.nodes) ? raw.nodes : Object.values(raw.nodes || {});
    const links = Array.isArray(raw.links) ? raw.links : [];
    return { nodes, links };
  }

  function getCssVar(name, fallback) {
    const rootValue = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (rootValue) return rootValue;
    const bodyValue = getComputedStyle(document.body).getPropertyValue(name).trim();
    return bodyValue || fallback;
  }

  function getLinkEndpointId(endpoint) {
    if (!endpoint) return null;
    return typeof endpoint === "object" ? endpoint.id : endpoint;
  }

  function getConnectedIds(nodeId, links) {
    const connected = new Set([nodeId]);
    links.forEach((link) => {
      const sid = getLinkEndpointId(link.source);
      const tid = getLinkEndpointId(link.target);
      if (sid === nodeId) connected.add(tid);
      if (tid === nodeId) connected.add(sid);
    });
    return connected;
  }

  async function init() {
    const container = document.getElementById("graph-full-container");
    if (!container || typeof ForceGraph !== "function") return;

    let rawData;
    try {
      const res = await fetch("/graph.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      rawData = await res.json();
    } catch (e) {
      console.warn("Failed to load /graph.json", e);
      return;
    }

    const graphData = toArrayGraphData(rawData);
    if (!graphData.nodes.length) return;

    const mainColor = getCssVar("--graph-main", "#8b6cef");
    const mutedColor = getCssVar("--graph-muted", "rgba(139,108,239,.35)");
    const fadedNodeColor = getCssVar("--graph-muted", "#333");
    const fadedLinkColor = getCssVar("--graph-muted", "rgba(139,108,239,.08)");

    const preview = document.getElementById("graph-preview");
    const previewTitle = document.getElementById("graph-preview-title");
    const previewExcerpt = document.getElementById("graph-preview-excerpt");
    const previewLink = document.getElementById("graph-preview-link");
    const previewClose = document.getElementById("graph-preview-close");

    let selectedNode = null;
    let hoverNode = null;

    function showPreview(node) {
      if (!preview || !previewTitle || !previewLink) return;
      previewTitle.textContent = node.title || node.id || "Untitled";

      if (previewExcerpt) {
        const excerpt = (node.excerpt || "").trim();
        if (excerpt) {
          previewExcerpt.textContent = excerpt;
          previewExcerpt.style.display = "";
        } else {
          previewExcerpt.textContent = "";
          previewExcerpt.style.display = "none";
        }
      }

      previewLink.href = node.url || "#";
      preview.classList.remove("graph-preview--hidden");
    }

    function hidePreview() {
      if (!preview) return;
      preview.classList.add("graph-preview--hidden");
    }

    function activeNode() {
      return selectedNode || hoverNode || null;
    }

    function currentConnectedSet() {
      const active = activeNode();
      if (!active) return null;
      return getConnectedIds(active.id, graphData.links);
    }

    const width = Math.max(1, container.offsetWidth || container.clientWidth || window.innerWidth);
    const height = Math.max(1, container.offsetHeight || container.clientHeight || window.innerHeight);

    const Graph = ForceGraph()(container)
      .width(width)
      .height(height)
      .graphData(graphData)
      .nodeId("id")
      .nodeLabel("title")
      .linkSource("source")
      .linkTarget("target")
      .d3AlphaDecay(0.08)
      .d3VelocityDecay(0.3)
      .autoPauseRedraw(false)
      .cooldownTicks(100)
      .warmupTicks(50)
      .enableZoomInteraction(true)
      .enablePanInteraction(true)
      .minZoom(0.5)
      .maxZoom(8)
      .nodeColor((node) => {
        const connected = currentConnectedSet();
        if (!connected) return mainColor;
        return connected.has(node.id) ? mainColor : fadedNodeColor;
      })
      .linkColor((link) => {
        const active = activeNode();
        if (!active) return mutedColor;
        const sid = getLinkEndpointId(link.source);
        const tid = getLinkEndpointId(link.target);
        const isConnected = sid === active.id || tid === active.id;
        return isConnected ? mainColor : fadedLinkColor;
      })
      .linkWidth((link) => {
        const active = activeNode();
        if (!active) return 1;
        const sid = getLinkEndpointId(link.source);
        const tid = getLinkEndpointId(link.target);
        return sid === active.id || tid === active.id ? 2 : 0.5;
      })
      .onNodeHover((node) => {
        container.style.cursor = node ? "pointer" : "default";
        if (selectedNode) return;
        hoverNode = node || null;
      })
      .onNodeClick((node) => {
        if (!node) return;
        if (selectedNode && selectedNode.id === node.id) {
          selectedNode = null;
          hoverNode = null;
          hidePreview();
          return;
        }
        selectedNode = node;
        hoverNode = null;
        showPreview(node);
      })
      .onBackgroundClick(() => {
        if (!selectedNode && !hoverNode) {
          hidePreview();
          return;
        }
        selectedNode = null;
        hoverNode = null;
        hidePreview();
      });

    if (previewClose) {
      previewClose.addEventListener("click", function () {
        selectedNode = null;
        hoverNode = null;
        hidePreview();
      });
    }

    window.addEventListener("resize", function () {
      Graph.width(Math.max(1, container.offsetWidth || container.clientWidth));
      Graph.height(Math.max(1, container.offsetHeight || container.clientHeight));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
