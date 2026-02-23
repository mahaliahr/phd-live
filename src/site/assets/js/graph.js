(function () {
  const GRAPH_CONTAINER_ID = "graph-container";

  function init() {
    const container = document.getElementById(GRAPH_CONTAINER_ID);
    if (!container) return;

    const isFullPage = container.classList.contains("full-page");
    
    container.innerHTML = '<p class="graph-loading">Loading graph...</p>';

    function setSize() {
      if (isFullPage) {
        const vh = Math.max(window.innerHeight || 0, 400);
        container.style.height = (vh - 220) + "px";
      }
      // Ensure container has explicit dimensions
      if (!container.style.width) {
        container.style.width = "100%";
      }
    }
    setSize();

    // Wait a frame for layout to settle before fetching
    requestAnimationFrame(() => {
      fetchGraph(container, isFullPage);
    });

    window.addEventListener("resize", () => {
      setSize();
      if (window._graphInstance) {
        window._graphInstance.width(container.clientWidth);
        window._graphInstance.height(container.clientHeight);
        setTimeout(() => {
          try { window._graphInstance.zoomToFit(300, 60); } catch {}
        }, 100);
      }
    });
  }

  async function fetchGraph(container, isFullPage) {
    const base = (window.BASE_URL || "/").replace(/\/+$/, "") + "/";
    
    let data;
    try {
      const res = await fetch(`${base}graph.json`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } catch (e) {
      console.warn("Failed to load graph.json", e);
      container.innerHTML = '<p class="graph-error">Failed to load graph data</p>';
      return;
    }

    if (!data || !data.nodes) {
      container.innerHTML = '<p class="graph-error">No graph data available</p>';
      return;
    }

    container.innerHTML = "";
    
    // Wait for container to have dimensions
    requestAnimationFrame(() => {
      renderGraph(container, data, isFullPage);
    });
  }

  function renderGraph(container, data, isFullPage) {
    const nodes = Object.values(data.nodes).filter(n => !n.hide);
    const hidden = new Set(Object.values(data.nodes).filter(n => n.hide).map(n => n.id));
    const links = (data.links || []).filter(l => !hidden.has(l.source) && !hidden.has(l.target));

    // Get container dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const css = getComputedStyle(document.documentElement);
    const mainColor = css.getPropertyValue("--graph-main")?.trim() || "#8b6cef";
    const mutedColor = css.getPropertyValue("--graph-muted")?.trim() || "rgba(154,165,206,0.55)";
    const textColor = css.getPropertyValue("--text-muted")?.trim() || "#999";

    let hoverNode = null;
    const highlight = new Set();

    const Graph = ForceGraph()(container)
      .width(width)
      .height(height)
      .graphData({ nodes, links })
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
      .linkColor(l => {
        if (!hoverNode) return mainColor;
        return (l.source.id === hoverNode.id || l.target.id === hoverNode.id) ? mainColor : mutedColor;
      })
      .linkWidth(l => {
        if (!hoverNode) return 1;
        return (l.source.id === hoverNode.id || l.target.id === hoverNode.id) ? 2 : 0.5;
      })
      .nodeCanvasObject((node, ctx, globalScale) => {
        const deg = (node.neighbors?.length) || 2;
        const baseSize = isFullPage ? 6 : 4;
        const r = Math.min(baseSize + 4, Math.max(baseSize, deg));
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
        
        const active = !hoverNode || node.id === hoverNode.id || highlight.has(node.url);
        ctx.fillStyle = active ? mainColor : mutedColor;
        ctx.fill();

        if (node.home) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 2, 0, 2 * Math.PI, false);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = mainColor;
          ctx.stroke();
        }

        const showLabel = globalScale > 1.5 || (hoverNode && node.id === hoverNode.id);
        if (showLabel) {
          const label = String(node.title || node.id || "");
          if (label) {
            const fontSize = Math.max(10 / globalScale, 3);
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = textColor;
            ctx.fillText(label, node.x, node.y + r + 2);
          }
        }
      })
      .onNodeHover(node => {
        highlight.clear();
        if (node) {
          highlight.add(node.url);
          (node.neighbors || []).forEach(u => highlight.add(u));
        }
        hoverNode = node || null;
        container.style.cursor = node ? "pointer" : "grab";
      })
      .onNodeClick(node => {
        if (node?.url) window.location = node.url;
      })
      .onBackgroundClick(() => {
        hoverNode = null;
        highlight.clear();
      });

    window._graphInstance = Graph;

    // Fit graph after simulation stabilizes
    function fitGraph() {
      try {
        Graph.zoomToFit(400, 80);
      } catch (e) {
        console.warn("zoomToFit failed:", e);
      }
    }

    // Multiple attempts to ensure graph fits
    Graph.onEngineStop(() => {
      setTimeout(fitGraph, 100);
    });

    // Fallback fits
    setTimeout(fitGraph, 500);
    setTimeout(fitGraph, 1500);
    setTimeout(fitGraph, 3000);

    // Control buttons
    document.getElementById("graph-zoomin")?.addEventListener("click", () => {
      const currentZoom = Graph.zoom();
      Graph.zoom(Math.min(currentZoom * 1.5, 8), 300);
    });

    document.getElementById("graph-zoomout")?.addEventListener("click", () => {
      const currentZoom = Graph.zoom();
      Graph.zoom(Math.max(currentZoom / 1.5, 0.5), 300);
    });

    document.getElementById("graph-zoomfit")?.addEventListener("click", fitGraph);

    document.getElementById("graph-reset")?.addEventListener("click", () => {
      Graph.zoom(1, 300);
      Graph.centerAt(0, 0, 300);
    });

    // Keyboard shortcuts
    container.setAttribute("tabindex", "0");
    container.addEventListener("keydown", (e) => {
      const currentZoom = Graph.zoom();
      switch (e.key) {
        case "+":
        case "=":
          Graph.zoom(Math.min(currentZoom * 1.3, 8), 200);
          break;
        case "-":
        case "_":
          Graph.zoom(Math.max(currentZoom / 1.3, 0.5), 200);
          break;
        case "0":
          fitGraph();
          break;
        case "Escape":
          hoverNode = null;
          highlight.clear();
          break;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();